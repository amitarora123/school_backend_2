import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../config/prisma";

export const createPermission = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { can_create, can_delete, can_update, can_read, module, role } =
        req.body;
      // r
      const existingRole = await prisma.role.findUnique({
        where: {
          name: role,
        },
      });
      if (!existingRole)
        return res.status(404).json({
          message: "role not found",
          success: false,
        });

      await prisma.permission.create({
        data: {
          can_create,
          can_delete,
          can_update,
          can_read,
          module,
          role: {
            connect: {
              id: existingRole.id,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Permission created successfully",
      });
    } catch (error) {
      console.log("Error occurred in createPermission controller", error);
      next(error);
    }
  }
);
