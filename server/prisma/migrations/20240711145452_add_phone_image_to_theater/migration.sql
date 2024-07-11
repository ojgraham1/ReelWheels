-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Theater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "location" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "latitude" REAL NOT NULL DEFAULT 0.0,
    "longitude" REAL NOT NULL DEFAULT 0.0,
    "image" TEXT DEFAULT '',
    "phoneNumber" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Theater" ("address", "email", "id", "image", "latitude", "location", "longitude") SELECT "address", "email", "id", "image", "latitude", "location", "longitude" FROM "Theater";
DROP TABLE "Theater";
ALTER TABLE "new_Theater" RENAME TO "Theater";
CREATE UNIQUE INDEX "Theater_email_key" ON "Theater"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
