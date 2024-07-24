-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "carpass" BOOLEAN NOT NULL,
    "isPurchased" BOOLEAN NOT NULL DEFAULT false,
    "showtime_id" INTEGER NOT NULL,
    "timePurchased" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Showtimes" (
    "id" SERIAL NOT NULL,
    "theater_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "times" TIMESTAMP(3) NOT NULL,
    "totalTickets" INTEGER NOT NULL DEFAULT 100,
    "generalAdmissionTickets" INTEGER NOT NULL DEFAULT 50,
    "carPassTickets" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "Showtimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theater" (
    "id" SERIAL NOT NULL,
    "Location" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "image" TEXT DEFAULT '',
    "phoneNumber" TEXT,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieAPI" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "vote_average" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MovieAPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concessions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Concessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Theater_email_key" ON "Theater"("email");

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "Showtimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtimes" ADD CONSTRAINT "Showtimes_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtimes" ADD CONSTRAINT "Showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "MovieAPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
