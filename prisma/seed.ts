import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.role.createMany({
    data: [
      {
        name: "admin", // Must match your RoleName enum
        description:
          "Full access to the system and can manage users, permissions, and settings.",
      },
      {
        name: "teacher",
        description: "Can manage courses, students, and grades.",
      },
      {
        name: "student",
        description: "Can access course materials and view grades.",
      },
    ],
    skipDuplicates: true, // Prevents errors if they already exist
  });

  console.log("Roles created successfully!");
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
