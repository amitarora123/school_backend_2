/*
  Warnings:

  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "roleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
