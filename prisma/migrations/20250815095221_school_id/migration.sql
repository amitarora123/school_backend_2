/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `schoolCode` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Admin" DROP CONSTRAINT "Admin_schoolId_fkey";

-- AlterTable
ALTER TABLE "public"."Admin" DROP COLUMN "schoolId",
ADD COLUMN     "schoolCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Admin" ADD CONSTRAINT "Admin_schoolCode_fkey" FOREIGN KEY ("schoolCode") REFERENCES "public"."School"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
