import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { createAccessToken } from "../utils/jwtUtil";
import prisma from "../config/prisma";
import { getAdminRole } from "../utils/findRole";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
};

export const createAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, designation, schoolCode } = req.body;
      const hashedPassword = await hashPassword(password);

      const adminRole = await getAdminRole();

      const createdAdmin = await prisma.admin.create({
        data: {
          designation,
          password: hashedPassword,
          username,
          school: {
            connect: {
              code: schoolCode,
            },
          },
          role: {
            connect: {
              id: adminRole!.id,
            },
          },
        },
      });

      res.status(200).json({
        message: "Admin Created Successfully",
        data: createdAdmin,
      });
    } catch (error) {
      console.log("An error occurred at createAdmin: ", error);
      next(error);
    }
  }
);

export const loginAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, schoolCode } = req.body;

      const admin = await prisma.admin.findUnique({
        where: {
          username: username,
          schoolCode: schoolCode,
        },
      });

      if (!admin)
        return res.status(401).json({ message: "Invalid Credentials" });

      const passwordMatch = await verifyPassword(
        password,
        admin.password as string
      );
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const accessToken = createAccessToken({
        id: admin.id as string,
        username: admin.username as string,
        roleId: admin.roleId as string,
        schoolCode: admin.schoolCode as string,
      });

      console.log("admin: ", admin.username, " just logged in");
      return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json({ message: "Sign in successful" });
    } catch (error) {
      console.log("Error inside the loginAdmin controller", error);
      next(error);
    }
  }
);

// ** Admin approves teacher to Register **
export const approveTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;

    const teacher = await prisma.teacher.update({
      where: { id: teacherId },
      data: { status: "ACTIVE" },
    });

    res.json({ message: "Teacher approved successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: "Error approving teacher", error });
  }
};
