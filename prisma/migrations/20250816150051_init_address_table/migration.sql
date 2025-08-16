/*
  Warnings:

  - Added the required column `schoolCode` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "schoolCode" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'INACTIVE';

-- AlterTable
ALTER TABLE "public"."Teacher" ALTER COLUMN "status" SET DEFAULT 'INACTIVE';

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_schoolCode_fkey" FOREIGN KEY ("schoolCode") REFERENCES "public"."School"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
