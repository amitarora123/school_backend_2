/*
  Warnings:

  - A unique constraint covering the columns `[roleId,module]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_module_key" ON "public"."Permission"("roleId", "module");
