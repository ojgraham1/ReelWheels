/*
  Warnings:

  - You are about to drop the column `address` on the `Theater` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Theater` table. All the data in the column will be lost.
  - Added the required column `Address` to the `Theater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Location` to the `Theater` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Theater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Location" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "latitude" REAL NOT NULL DEFAULT 0.0,
    "longitude" REAL NOT NULL DEFAULT 0.0,
    "image" TEXT DEFAULT '',
    "phoneNumber" TEXT
);
INSERT INTO "new_Theater" ("email", "id", "image", "latitude", "longitude", "phoneNumber") SELECT "email", "id", "image", "latitude", "longitude", "phoneNumber" FROM "Theater";
DROP TABLE "Theater";
ALTER TABLE "new_Theater" RENAME TO "Theater";
CREATE UNIQUE INDEX "Theater_email_key" ON "Theater"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
