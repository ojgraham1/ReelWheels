const { PrismaClient } = require("@prisma/client");

const insertNowPlayingMovies = require("../insertMovies");
const prisma = new PrismaClient();

async function main() {
  await insertNowPlayingMovies();

  console.log("seeding database");

  const maya = await prisma.users.create({
    data: {
      username: "luckystar",
      password: "lucky",
      firstName: "Maya",
      lastName: "Obeidat",
      email: "maya@gmail.com",
      address: "777 Lucky St.",
      phoneNumber: "(770)777-7777",
      birthdate: new Date(2001, 2, 1),
      isAdmin: true,
    },
  });

  console.log(maya);

  console.log("seeding database");

  const thomas = await prisma.users.create({
    data: {
      username: "princessprisma",
      password: "princess",
      firstName: "Thomas",
      lastName: "Graham",
      email: "thomas@gmail.com",
      address: "444 Princess Ln.",
      phoneNumber: "(404)444-4444",
      birthdate: new Date(1978, 3, 12),
      isAdmin: true,
    },
  });

  console.log(thomas);

  const olivia = await prisma.users.create({
    data: {
      username: "catattack",
      password: "kitty",
      firstName: "Olivia",
      lastName: "Graham",
      email: "olivia@gmail.com",
      address: "999 Kitten Ln.",
      phoneNumber: "(202)999-999",
      birthdate: new Date(2000, 7, 26),
      isAdmin: true,
    },
  });

  console.log(olivia);

  const daniel = await prisma.users.create({
    data: {
      username: "bravesfan1",
      password: "bball",
      firstName: "Daniel",
      lastName: "Patterson",
      email: "daniel@gmail.com",
      address: "333 Baseball Cr.",
      phoneNumber: "(470)333-3333",
      birthdate: new Date(1886, 5, 23),
      isAdmin: true,
    },
  });

  console.log(daniel);

  const theater1 = await prisma.theater.create({
    data: {
      Location: "Georgia",
      Address: "123 DriveIn Lane",
      Capacity: 50,
      email: "reelwheels1@gmail.com",
    },
  });
  console.log("Created theater:", theater1);

  const theater2 = await prisma.theater.create({
    data: {
      Location: "Michigan",
      Address: "456 Movie Street",
      Capacity: 50,
      email: "reelwheels2@gmail.com",
    },
  });
  console.log("Created theater:", theater2);

  const showtime1 = await prisma.Showtimes.create({
    data: {
      theater_id: 1,
      movie_id: 786892,
      times: new Date(2024, 7, 2, 14, 0, 0),
    },
  });
  console.log("Created showtime:", showtime1);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);

    await prisma.$disconnect();
    process.exit(1);
  });
