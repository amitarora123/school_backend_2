import jwt from "jsonwebtoken";

export const generateToken = (id: string, role: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
  }

  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
