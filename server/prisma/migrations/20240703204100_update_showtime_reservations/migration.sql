/*
  Warnings:

  - You are about to drop the column `Capacity` on the `Theater` table. All the data in the column will be lost.
  - You are about to drop the column `carpassAvailable` on the `Theater` table. All the data in the column will be lost.
  - You are about to drop the column `carpassCapacity` on the `Theater` table. All the data in the column will be lost.
  - You are about to drop the column `generalAdmissionAvailable` on the `Theater` table. All the data in the column will be lost.
  - You are about to drop the column `generalAdmissionCapacity` on the `Theater` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Showtimes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "theater_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "times" DATETIME NOT NULL,
    "totalTickets" INTEGER NOT NULL DEFAULT 100,
    "availableTickets" INTEGER NOT NULL DEFAULT 100,
    "carPassTickets" INTEGER NOT NULL DEFAULT 50,
    CONSTRAINT "Showtimes_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "Theater" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "MovieAPI" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Showtimes" ("id", "movie_id", "theater_id", "times") SELECT "id", "movie_id", "theater_id", "times" FROM "Showtimes";
DROP TABLE "Showtimes";
ALTER TABLE "new_Showtimes" RENAME TO "Showtimes";
CREATE TABLE "new_Theater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Location" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Theater" ("Address", "Location", "email", "id") SELECT "Address", "Location", "email", "id" FROM "Theater";
DROP TABLE "Theater";
ALTER TABLE "new_Theater" RENAME TO "Theater";
CREATE UNIQUE INDEX "Theater_email_key" ON "Theater"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
