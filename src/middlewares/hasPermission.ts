// middleware/hasPermission.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const hasPermission = (
  module: string,
  action: "can_create" | "can_read" | "can_update" | "can_delete"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { schoolCode } = req.body;

    const permission = await prisma.permission.findUnique({
      where: {
        roleId_module: {
          roleId: user!.roleId,
          module: module,
        },
      },
    });

    if (!permission || !permission[action] || schoolCode != user?.schoolCode) {
      return res
        .status(403)
        .json({ message: `Access denied: Missing ${action} on ${module}.` });
    }

    next();
  };
};
