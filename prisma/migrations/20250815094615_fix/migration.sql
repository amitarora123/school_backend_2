/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `School` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `schoolCode` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Admin" DROP CONSTRAINT "Admin_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Class" DROP CONSTRAINT "Class_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Teacher" DROP CONSTRAINT "Teacher_schoolId_fkey";

-- AlterTable
ALTER TABLE "public"."Class" DROP COLUMN "schoolId",
ADD COLUMN     "schoolCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."School" DROP CONSTRAINT "School_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "School_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "public"."Teacher" DROP COLUMN "schoolId",
ADD COLUMN     "schoolCode" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Admin" ADD CONSTRAINT "Admin_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Teacher" ADD CONSTRAINT "Teacher_schoolCode_fkey" FOREIGN KEY ("schoolCode") REFERENCES "public"."School"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_schoolCode_fkey" FOREIGN KEY ("schoolCode") REFERENCES "public"."School"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
