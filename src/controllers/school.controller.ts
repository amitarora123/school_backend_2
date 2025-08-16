import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../config/prisma";
import { Board, Medium, SchoolType } from "@prisma/client";

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
