import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { generateToken } from "../utils/generateToken";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password, designation, schoolId, roleId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        designation,
        schoolId,
        roleId,
      },
    });

    res.status(201).json({
      id: admin.id,
      username: admin.username,
      token: generateToken(admin.id, roleId),
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      id: admin.id,
      username: admin.username,
      token: generateToken(admin.id, admin.roleId),
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
