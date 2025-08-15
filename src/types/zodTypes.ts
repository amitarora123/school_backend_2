import * as z from "zod";

export const createAdminSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(6),
  designation: z.string(),
  school_id: z.string(),
});

export const addressSchema = z.object({
  street: z.string(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipCode: z.string(),
});

export const createSchoolSchema = z.object({
  name: z.string(),
  code: z.string(),
  affiliationNumber: z.string(),
  board: z.enum(["CBSE", "ICSE", "STATE", "IB", "CAMBRIDGE"]),
  medium: z.enum(["English", "Hindi", "Regional"]),
  establishmentYear: z.int(),
  schoolType: z.enum(["Private", "Government", "Aided", "International"]),
  contactPhone: z.string().min(10).max(10).optional(),
  contactEmail: z.email().optional(),
  website: z.string().optional(),
  logoUrl: z.string().optional(),
  address: addressSchema,
});

export const loginAdminSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createTeacherSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  password: z.string().min(6),
  phone: z.string().min(10).max(10),
  school_id: z.string(),
  designation: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const loginTeacherSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const permissionSchema = z.object({
  module: z.string(),
  can_create: z.boolean(),
  can_delete: z.boolean(),
  can_update: z.boolean(),
  can_read: z.boolean(),
  role_id: z.string(),
});

export const createClassSchema = z.object({
  name: z.string(),
  standard: z.number(),
  school_id: z.string(),
});

export const createSectionSchema = z.object({
  room_no: z.string(),
});
