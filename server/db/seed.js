const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const insertNowPlayingMovies = require("../insertMovies");
const prisma = new PrismaClient();

const TMDB_API_KEY =
  process.env.TMDB_API_KEY || "60bff7c4b3bc017974f0186538e281a6";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Grab runtime directly from single movie
async function fetchMovieRuntime(movieId) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    return response.data.runtime;
  } catch (error) {
    console.error(`Error fetching runtime for movie ${movieId}:`, error);
    return 120; // Default time added incase all fails
  }
}

// Use array push method to generate showtimes based on movie runtime
function generateShowtimes(runtime, startTime) {
  const showtimes = [];
  for (let i = 0; i < 1; i++) {
    // 1 showtime per movie for each theater
    showtimes.push(new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + runtime + 30); // Add runtime with 30 minute intermission
  }
  return showtimes;
}

async function main() {
  await insertNowPlayingMovies();

  console.log("seeding database");

  // Delete existing data
  await prisma.showtimes.deleteMany({});
  await prisma.theater.deleteMany({});

  // Create/update users
  const usersData = [
    {
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
    {
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
    {
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
    {
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
  ];

  for (const userData of usersData) {
    const user = await prisma.users.upsert({
      where: { email: userData.email },
      update: userData,
      create: userData,
    });
    console.log(user);
  }

  const theatersData = [
    {
      Location: "New York",
      Address: "190 Bowery, New York, NY 10012",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels1@gmail.com",
    },
    {
      Location: "Brooklyn",
      Address: "152 Grand St, Brooklyn, NY 11249",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels2@gmail.com",
    },
    {
      Location: "San Francisco",
      Address: "1015 Market St, San Francisco, CA 94103",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels3@gmail.com",
    },
    {
      Location: "West Hollywood",
      Address: "8801 Sunset Blvd, West Hollywood, CA 90069",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels4@gmail.com",
    },
    {
      Location: "Chicago",
      Address: "1438 N Milwaukee Ave, Chicago, IL 60622",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels5@gmail.com",
    },
    {
      Location: "London",
      Address: "2/3 Peter St, London W1F 0AA, United Kingdom",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels6@gmail.com",
    },
    {
      Location: "Paris",
      Address: "20 Rue Barbette, 75003 Paris, France",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels7@gmail.com",
    },
    {
      Location: "Milan",
      Address: "Corso Garibaldi, 20, 20121 Milano MI, Italy",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels8@gmail.com",
    },
    {
      Location: "Berlin",
      Address: "Torstraße 74, 10119 Berlin, Germany",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels9@gmail.com",
    },
    {
      Location: "Shibuya",
      Address:
        "Japan, 〒150-0041 Tokyo, Shibuya City, Jinnan, 1 Chome−18−2, Frame Jinnan-zaka, 1 F",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels10@gmail.com",
    },
    {
      Location: "Osaka",
      Address: "1 Chome-9-8 Minamihorie, Nishi Ward, Osaka, 550-0015, Japan",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels11@gmail.com",
    },
    {
      Location: "Harajuku",
      Address:
        "Japan, 〒150-0001 Tokyo, Shibuya City, Jingumae, 4 Chome-32-7 神崎ビル 2 F",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels12@gmail.com",
    },
    {
      Location: "Fukuoka",
      Address:
        "Japan, 〒810-0041 Fukuoka, Chuo Ward, Daimyo, 1 Chome-15-35 ２４７ビル 1 F",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels13@gmail.com",
    },
    {
      Location: "Daikanyama",
      Address:
        "Japan, 〒150-0034 Tokyo, Shibuya City, Daikanyamacho, 1−6, Hirota Daikanyama Building, 1 F",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels14@gmail.com",
    },
    {
      Location: "Nagoya",
      Address:
        "Japan, 〒460-0008 Aichi, Nagoya, Naka Ward, Sakae, 3 Chome-13-28 1 F",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels15@gmail.com",
    },
    {
      Location: "Seoul",
      Address: "648 Sinsa-dong, Gangnam District, Seoul, South Korea",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels16@gmail.com",
    },
    {
      Location: "Shangai",
      Address: "No.291 Fumin Road Xuhui District, 2000030. Shanghai, China",
      Capacity: 100,
      carpassCapacity: 50,
      generalAdmissionCapacity: 50,
      carpassAvailable: 50,
      generalAdmissionAvailable: 50,
      email: "reelwheels17@gmail.com",
    },
  ];

  for (const theaterData of theatersData) {
    const theater = await prisma.theater.upsert({
      where: { email: theaterData.email },
      update: theaterData,
      create: theaterData,
    });
    console.log("Created or updated theater:", theater);

    // Grab 5 random movies from MovieAPI table
    const movies = await prisma.movieAPI.findMany({
      take: 5,
      orderBy: {
        id: "desc",
      },
    });

    let startTime = new Date();
    startTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

    for (const movie of movies) {
      const runtime = await fetchMovieRuntime(movie.id);
      const showtimes = generateShowtimes(runtime, new Date(startTime));

      for (const time of showtimes) {
        await prisma.showtimes.create({
          data: {
            theater_id: theater.id,
            movie_id: movie.id,
            times: time,
          },
        });
        console.log(`Created showtime for movie ${movie.title} at ${time}`);
      }

      // Adjust start time for the next movie
      startTime.setHours(startTime.getHours() + Math.ceil(runtime / 60) + 1); // Adds based on movie runtime, 1 hour spacing
    }
  }
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
