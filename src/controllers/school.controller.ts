import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../config/prisma";
import { Board, Medium, SchoolType , } from "@prisma/client";
import bcrypt from "bcrypt";



export const createSchool = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const {
        name,
        code,
        affiliationNumber,
        board,
        medium,
        establishmentYear,
        schoolType,
        contactPhone,
        website,
        logoUrl,
        address,
      } = req.body;
      const school = await prisma.school.create({
        data: {
          board: board as Board,
          schoolType: schoolType as SchoolType,
          name,
          code,
          affiliationNumber,
          medium: medium as Medium,
          establishmentYear,
          contactPhone,
          website,
          logoUrl,
          address: {
            create: {
              street: address.street,
              city: address.city,
              state: address.state,
              country: address.country,
              zipCode: address.zipCode,
            },
          },
        },
      });

      return res.status(200).json({
        data: school,
        success: true,
        message: "School created successfully",
      });
    } catch (error) {
      console.log("Error while creating a school", error);
      next(error);
    }
  }
);
export const signup = asyncHandler(async (req: Request, res: Response) => {


  // Extract locationCode from req.body or set a default value
const locationCode = req.body.locationCode || "DEFAULT";

const lastSchool = await prisma.school.findFirst({
  where: {
    code: {
      startsWith: `SCHOOL-${locationCode}-`,
    },
  },
  orderBy: {
    code: "desc",
  },
});

let nextNumber = "0000";
if (lastSchool) {
  const lastCode = lastSchool.code.split("-")[2]; // e.g., "0023"
  const next = parseInt(lastCode, 10) + 1;
  nextNumber = String(next).padStart(4, "0");
}
const generatedCode = `SCHOOL-${locationCode}-${nextNumber}`;


  const { username, password, school_id } = req.body;

  const existing = await prisma.school_Admin.findUnique({ where: { username } });
  if (existing) {
    return res.status(400).json({ success: false, message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.school_Admin.create({
    data: {
      username,
      password: hashedPassword,
      school_id: generatedCode,
    },
  });

  res.status(201).json({
    success: true,
    message: "Signup successful",
    data: { id: admin.id, username: admin.username },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const admin = await prisma.school_Admin.findUnique({ where: { username } });
  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { id: admin.id, username: admin.username },
  });
});