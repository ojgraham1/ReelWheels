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
    return 120; // Default time added in case all fails
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
  await prisma.reservations.deleteMany({});
  await prisma.showtimes.deleteMany({});
  await prisma.theater.deleteMany({});

  // Create/update users
  const usersData = [
    // data gone
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
      email: "reelwheels1@gmail.com",
      latitude: 40.72132,
      longitude: -73.993286,
      phoneNumber: "212-966-7799",
      image: "add_image",
    },
    {
      Location: "Brooklyn",
      Address: "152 Grand St, Brooklyn, NY 11249",
      email: "reelwheels2@gmail.com",
      latitude: 40.714623,
      longitude: -73.961452,
      phoneNumber: "718-599-2700",
      image: "add_image",
    },
    {
      Location: "San Francisco",
      Address: "1015 Market St, San Francisco, CA 94103",
      email: "reelwheels3@gmail.com",
      latitude: 37.78268,
      longitude: -122.410729,
      phoneNumber: "415-991-2929",
      image: "add_image",
    },
    {
      Location: "West Hollywood",
      Address: "8801 Sunset Blvd, West Hollywood, CA 90069",
      email: "reelwheels4@gmail.com",
      latitude: 34.09,
      longitude: -118.386627,
      phoneNumber: "323-655-6205",
      image: "add_image",
    },
    {
      Location: "Chicago",
      Address: "1438 N Milwaukee Ave, Chicago, IL 60622",
      email: "reelwheels5@gmail.com",
      latitude: 41.908217,
      longitude: -87.677137,
      phoneNumber: "312-300-0562",
      image: "add_image",
    },
    {
      Location: "London",
      Address: "2/3 Peter St, London W1F 0AA, United Kingdom",
      email: "reelwheels6@gmail.com",
      latitude: 51.5143,
      longitude: -0.1312,
      phoneNumber: "+44 207-437-0493",
      image: "add_image",
    },
    {
      Location: "Paris",
      Address: "20 Rue Barbette, 75003 Paris, France",
      email: "reelwheels7@gmail.com",
      latitude: 48.8598,
      longitude: 2.3626,
      phoneNumber: "+33 1 43 48 80 14",
      image: "add_image",
    },
    {
      Location: "Milan",
      Address: "Corso Garibaldi, 20, 20121 Milano MI, Italy",
      email: "reelwheels8@gmail.com",
      latitude: 45.4789,
      longitude: 9.1926,
      phoneNumber: "+39 02 84349776",
      image: "add_image",
    },
    {
      Location: "Berlin",
      Address: "Torstraße 74, 10119 Berlin, Germany",
      email: "reelwheels9@gmail.com",
      latitude: 52.5292,
      longitude: 13.401,
      phoneNumber: "+49 030 27013724",
      image: "add_image",
    },
    {
      Location: "Shibuya",
      Address:
        "Japan, 〒150-0041 Tokyo, Shibuya City, Jinnan, 1 Chome−18−2, Frame Jinnan-zaka, 1 F",
      email: "reelwheels10@gmail.com",
      latitude: 35.661751,
      longitude: 139.703081,
      phoneNumber: "03-5428-4393",
      image: "add_image",
    },
    {
      Location: "Osaka",
      Address: "1 Chome-9-8 Minamihorie, Nishi Ward, Osaka, 550-0015, Japan",
      email: "reelwheels11@gmail.com",
      latitude: 34.678395,
      longitude: 135.49892,
      phoneNumber: "06-6533-0705",
      image: "add_image",
    },
    {
      Location: "Harajuku",
      Address:
        "Japan, 〒150-0001 Tokyo, Shibuya City, Jingumae, 4 Chome-32-7 神崎ビル 2 F",
      email: "reelwheels12@gmail.com",
      latitude: 35.6702,
      longitude: 139.704057,
      phoneNumber: "03-5771-0090",
      image: "add_image",
    },
    {
      Location: "Fukuoka",
      Address:
        "Japan, 〒810-0041 Fukuoka, Chuo Ward, Daimyo, 1 Chome-15-35 ２４７ビル 1 F",
      email: "reelwheels13@gmail.com",
      latitude: 33.589606,
      longitude: 130.396423,
      phoneNumber: "092-732-5002",
      image: "add_image",
    },
    {
      Location: "Daikanyama",
      Address:
        "Japan, 〒150-0034 Tokyo, Shibuya City, Daikanyamacho, 1−6, Hirota Daikanyama Building, 1 F",
      email: "reelwheels14@gmail.com",
      latitude: 35.648888,
      longitude: 139.703534,
      phoneNumber: "03-5456-0085",
      image: "add_image",
    },
    {
      Location: "Nagoya",
      Address:
        "Japan, 〒460-0008 Aichi, Nagoya, Naka Ward, Sakae, 3 Chome-13-28 1 F",
      email: "reelwheels15@gmail.com",
      latitude: 35.171238,
      longitude: 136.905157,
      phoneNumber: "052-261-2858",
      image: "add_image",
    },
    {
      Location: "Seoul",
      Address: "648 Sinsa-dong, Gangnam District, Seoul, South Korea",
      email: "reelwheels16@gmail.com",
      latitude: 37.524,
      longitude: 127.0226,
      phoneNumber: "+82-02-2138-0948",
      image: "add_image",
    },
    {
      Location: "Shanghai",
      Address: "No.291 Fumin Road Xuhui District, 2000030. Shanghai, China",
      email: "reelwheels17@gmail.com",
      latitude: 31.2208,
      longitude: 121.4513,
      phoneNumber: "+86-021-6025-0570",
      image: "add_image",
    },
    {
      Location: "Atlanta",
      Address: "3035 Peachtree Rd, Atlanta, GA 30305",
      email: "reelwheels18@gmail.com",
      latitude: 33.838841,
      longitude: -84.380023,
      phoneNumber: "678-999-8212",
      image: "add_image",
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
            totalTickets: 100,
            generalAdmissionTickets: 50,
            carPassTickets: 50,
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
