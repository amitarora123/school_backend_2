import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { getStudentRole } from "../utils/findRole";
import { createAccessToken } from "../utils/jwtUtil";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      dob,
      gender,
      address,
      email,
      phone,
      password,
      schoolCode,
      admissionNo,
      aadhar,
      category,
      classId,
      sectionId,
      roleId,
    } = req.body;

    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const studentRole = await getStudentRole();

    const student = await prisma.student.create({
      data: {
        id,
        name,
        dob: new Date(dob),
        gender,
        address,
        password: hashedPassword,
        email,
        phone,
        photo: null,
        admissionNo,
        aadhar,
        category, 
        schoolCode,
        school: {
          connect: {
            code: schoolCode,
          },
        },
        class: {
          connect: {
            id: classId,
          },
        },
        role: {
          connect: {
            id: studentRole?.id,
          },
        },
        section: {
          connect: {
            id: sectionId,
          },
        },
        status: "INACTIVE",
      },
    });

    res.status(201).json({
      message: "Student registered successfully. Waiting for teacher approval.",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await prisma.student.findUnique({ where: { email } });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (student.status !== "ACTIVE") {
      return res
        .status(403)
        .json({ message: "Account not approved by teacher yet." });
    }

    const isMatch = await verifyPassword(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createAccessToken({
      id: student.id,
      roleId: "student",
      schoolCode: student.schoolCode,
      username: email,
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in student", error });
  }
};
