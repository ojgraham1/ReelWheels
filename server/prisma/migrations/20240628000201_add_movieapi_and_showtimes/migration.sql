/*
  Warnings:

  - Added the required column `overview` to the `MovieAPI` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `MovieAPI` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MovieAPI` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `MovieAPI` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovieAPI" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "vote_average" REAL NOT NULL
);
INSERT INTO "new_MovieAPI" ("id") SELECT "id" FROM "MovieAPI";
DROP TABLE "MovieAPI";
ALTER TABLE "new_MovieAPI" RENAME TO "MovieAPI";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
