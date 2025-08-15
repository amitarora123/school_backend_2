// middleware/hasPermission.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const hasPermission = (
  module: string,
  action: "can_create" | "can_read" | "can_update" | "can_delete"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { school_id } = req.body;

    console.log("body school_id: ", school_id);
    console.log("admin school_id: ", user?.school_id);
    const permission = await prisma.permission.findUnique({
      where: {
        roleId_module: {
          roleId: user!.role_id,
          module: module,
        },
      },
    });

    if (!permission || !permission[action] || school_id != user?.school_id) {
      return res
        .status(403)
        .json({ message: `Access denied: Missing ${action} on ${module}.` });
    }

    next();
  };
};
