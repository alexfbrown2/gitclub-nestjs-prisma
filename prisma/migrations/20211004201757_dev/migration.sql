/*
  Warnings:

  - You are about to drop the column `base_repo_role` on the `Org` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address` on the `Org` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baseRepoRole` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingAddress` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Org" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "baseRepoRole" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "typename" TEXT NOT NULL DEFAULT 'Org'
);
INSERT INTO "new_Org" ("id", "name", "typename") SELECT "id", "name", "typename" FROM "Org";
DROP TABLE "Org";
ALTER TABLE "new_Org" RENAME TO "Org";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
