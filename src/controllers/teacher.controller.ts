import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password, designation, schoolId, roleId } =
      req.body;

    const existingTeacher = await prisma.teacher.findUnique({
      where: { email },
    });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await prisma.teacher.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
        designation,
        schoolId,
        roleId,
        status: "INACTIVE", // not approved yet
      },
    });

    res
      .status(201)
      .json({
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

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: teacher.id, roleId: teacher.roleId, schoolId: teacher.schoolId },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in teacher", error });
  }
};
