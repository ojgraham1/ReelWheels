-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Theater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Location" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Capacity" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "carpassCapacity" INTEGER NOT NULL DEFAULT 50,
    "generalAdmissionCapacity" INTEGER NOT NULL DEFAULT 50,
    "carpassAvailable" INTEGER NOT NULL DEFAULT 50,
    "generalAdmissionAvailable" INTEGER NOT NULL DEFAULT 50
);
INSERT INTO "new_Theater" ("Address", "Capacity", "Location", "email", "id") SELECT "Address", "Capacity", "Location", "email", "id" FROM "Theater";
DROP TABLE "Theater";
ALTER TABLE "new_Theater" RENAME TO "Theater";
CREATE UNIQUE INDEX "Theater_email_key" ON "Theater"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
