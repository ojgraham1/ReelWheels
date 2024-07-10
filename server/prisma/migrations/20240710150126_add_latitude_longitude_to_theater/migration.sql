-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Theater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Location" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "latitude" REAL NOT NULL DEFAULT 0.0,
    "longitude" REAL NOT NULL DEFAULT 0.0
);
INSERT INTO "new_Theater" ("Address", "Location", "email", "id") SELECT "Address", "Location", "email", "id" FROM "Theater";
DROP TABLE "Theater";
ALTER TABLE "new_Theater" RENAME TO "Theater";
CREATE UNIQUE INDEX "Theater_email_key" ON "Theater"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
