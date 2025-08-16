import * as z from "zod";

export const createAdminSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(6),
  designation: z.string(),
  schoolCode: z.string(),
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
  schoolCode: z.string(),
});

export const createTeacherSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  password: z.string().min(6),
  phone: z.string().min(10).max(10),
  schoolCode: z.string(),
  designation: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const createStudentSchema = z.object({
  name: z.string(),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10).max(10),
  photo: z.string().url().optional(),
  admissionNo: z.string(),
  aadhar: z.string().length(12, { message: "Aadhar must be 12 digits" }),
  category: z.string(),
  roleId: z.string(),
  classId: z.string(),
  sectionId: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "LEFT", "TRANSFERRED"]).optional(),
});

export const loginTeacherSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const createPermissionSchema = z.object({
  module: z.string(),
  can_create: z.boolean(),
  can_delete: z.boolean(),
  can_update: z.boolean(),
  can_read: z.boolean(),
  role: z.string(),
});

export const createClassSchema = z.object({
  name: z.string(),
  standard: z.number(),
  schoolCode: z.string(),
});

export const createSectionSchema = z.object({
  room_no: z.string(),
});
