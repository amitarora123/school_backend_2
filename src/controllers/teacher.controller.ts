import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { hashPassword, verifyPassword } from "../utils/bcrypt";

export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password, designation, schoolCode } =
      req.body;

    const existingTeacher = await prisma.teacher.findUnique({
      where: { email },
    });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher with this email already exists" });
    }

    const teacherRole = await prisma.role.findUnique({
      where: {
        name: "teacher",
      },
    });
    const hashedPassword = await hashPassword(password);

    const teacher = await prisma.teacher.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
        designation,
        school: {
          connect: {
            code: schoolCode,
          },
        },
        role: {
          connect: {
            id: teacherRole!.id,
          },
        },
        status: "INACTIVE", // not approved yet
      },
    });

    res.status(201).json({
      message: "Teacher registered successfully, waiting for admin approval",
      teacher,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering teacher", error });
  }
};

export const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const teacher = await prisma.teacher.findUnique({ where: { email } });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (teacher.status !== "ACTIVE") {
      return res
        .status(403)
        .json({ message: "Account not approved by admin yet." });
    }

    const isMatch = await verifyPassword(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: teacher.id,
        roleId: teacher.roleId,
        schoolCode: teacher.schoolCode,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in teacher", error });
  }
};

// ** Teacher will approve student Registeration **
export const approveStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const student = await prisma.student.update({
      where: { id: studentId },
      data: { status: "ACTIVE" },
    });

    res.json({ message: "Student approved successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error approving student", error });
  }
};
