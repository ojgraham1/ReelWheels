/*
  Warnings:

  - The primary key for the `MovieAPI` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `MovieAPI` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Reservations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Reservations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `showtime_id` on the `Reservations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `Reservations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Showtimes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Showtimes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `movie_id` on the `Showtimes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `theater_id` on the `Showtimes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Theater` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Theater` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovieAPI" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "vote_average" REAL NOT NULL
);
INSERT INTO "new_MovieAPI" ("backdrop_path", "id", "overview", "poster_path", "release_date", "title", "vote_average") SELECT "backdrop_path", "id", "overview", "poster_path", "release_date", "title", "vote_average" FROM "MovieAPI";
DROP TABLE "MovieAPI";
ALTER TABLE "new_MovieAPI" RENAME TO "MovieAPI";
CREATE TABLE "new_Reservations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "carpass" BOOLEAN NOT NULL,
    "isPurchased" BOOLEAN NOT NULL DEFAULT false,
    "showtime_id" INTEGER NOT NULL,
    "timePurchased" DATETIME NOT NULL,
    CONSTRAINT "Reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservations_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "Showtimes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservations" ("carpass", "id", "isPurchased", "quantity", "showtime_id", "timePurchased", "user_id") SELECT "carpass", "id", "isPurchased", "quantity", "showtime_id", "timePurchased", "user_id" FROM "Reservations";
DROP TABLE "Reservations";
ALTER TABLE "new_Reservations" RENAME TO "Reservations";
CREATE TABLE "new_Showtimes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "theater_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "times" DATETIME NOT NULL,
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
    "Capacity" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Theater" ("Address", "Capacity", "Location", "email", "id") SELECT "Address", "Capacity", "Location", "email", "id" FROM "Theater";
DROP TABLE "Theater";
ALTER TABLE "new_Theater" RENAME TO "Theater";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Users" ("address", "birthdate", "email", "firstName", "id", "isAdmin", "lastName", "password", "phoneNumber", "username") SELECT "address", "birthdate", "email", "firstName", "id", "isAdmin", "lastName", "password", "phoneNumber", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
