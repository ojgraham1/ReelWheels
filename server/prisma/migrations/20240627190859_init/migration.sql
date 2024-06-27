-- CreateTable
CREATE TABLE "Users" (
    "id" BIGINT NOT NULL PRIMARY KEY,
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

-- CreateTable
CREATE TABLE "Reservations" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "carpass" BOOLEAN NOT NULL,
    "isPurchased" BOOLEAN NOT NULL DEFAULT false,
    "showtime_id" BIGINT NOT NULL,
    "timePurchased" DATETIME NOT NULL,
    CONSTRAINT "Reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservations_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "Showtimes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Showtimes" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "theater_id" BIGINT NOT NULL,
    "movie_id" BIGINT NOT NULL,
    "times" DATETIME NOT NULL,
    CONSTRAINT "Showtimes_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "Theater" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "MovieAPI" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Theater" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "Location" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Capacity" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieAPI" (
    "id" BIGINT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
