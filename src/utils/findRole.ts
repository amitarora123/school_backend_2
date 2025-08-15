import prisma from "../config/prisma";

export const getAdminRole = async () => {
  try {
    return await prisma.role.findUnique({
      where: {
        name: "admin",
      },
    });
  } catch (error) {
    console.log("Error fetching admin role");
    return null;
  }
};
export const getTeacherRole = async () => {
  try {
    return await prisma.role.findUnique({
      where: {
        name: "teacher",
      },
    });
  } catch (error) {
    console.log("Error fetching admin role");
    return null;
  }
};

export const getStudentRole = async () => {
  try {
    return await prisma.role.findUnique({
      where: {
        name: "student",
      },
    });
  } catch (error) {
    console.log("Error fetching admin role");
    return null;
  }
};
