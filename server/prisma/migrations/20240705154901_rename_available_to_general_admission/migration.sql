/*
  Warnings:

  - You are about to drop the column `availableTickets` on the `Showtimes` table. All the data in the column will be lost.

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
    "generalAdmissionTickets" INTEGER NOT NULL DEFAULT 50,
    "carPassTickets" INTEGER NOT NULL DEFAULT 50,
    CONSTRAINT "Showtimes_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "Theater" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "MovieAPI" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Showtimes" ("carPassTickets", "id", "movie_id", "theater_id", "times", "totalTickets") SELECT "carPassTickets", "id", "movie_id", "theater_id", "times", "totalTickets" FROM "Showtimes";
DROP TABLE "Showtimes";
ALTER TABLE "new_Showtimes" RENAME TO "Showtimes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
