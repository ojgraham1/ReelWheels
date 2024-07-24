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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function main() {
  await insertNowPlayingMovies();

  console.log("seeding database");

  // Delete existing data
  await prisma.reservations.deleteMany({});
  await prisma.showtimes.deleteMany({});
  await prisma.theater.deleteMany({});

  const theatersData = [
    {
      Location: "Atlanta",
      Address: "3035 Peachtree Rd, Atlanta, GA 30305",
      email: "reelwheels18@gmail.com",
      latitude: 33.838841,
      longitude: -84.380023,
      phoneNumber: "678-999-8212",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Midtown_atlanta_%28cropped%29.jpg/1000px-Midtown_atlanta_%28cropped%29.jpg",
    },
    {
      Location: "New York",
      Address: "190 Bowery, New York, NY 10012",
      email: "reelwheels1@gmail.com",
      latitude: 40.72132,
      longitude: -73.993286,
      phoneNumber: "212-966-7799",
      image:
        "https://www.amny.com/wp-content/uploads/2022/08/GettyImages-523538287.jpg",
    },
    {
      Location: "Brooklyn",
      Address: "152 Grand St, Brooklyn, NY 11249",
      email: "reelwheels2@gmail.com",
      latitude: 40.714623,
      longitude: -73.961452,
      phoneNumber: "718-599-2700",
      image:
        "https://mgnyconsulting.com/wp-content/uploads/2022/11/brooklyntower-featured-scaled.webp",
    },
    {
      Location: "San Francisco",
      Address: "1015 Market St, San Francisco, CA 94103",
      email: "reelwheels3@gmail.com",
      latitude: 37.78268,
      longitude: -122.410729,
      phoneNumber: "415-991-2929",
      image:
        "https://images.squarespace-cdn.com/content/v1/5c7f5f60797f746a7d769cab/1708063049157-NMFAB7KBRBY2IG2BWP4E/the+golden+gate+bridge+san+francisco.jpg",
    },
    {
      Location: "West Hollywood",
      Address: "8801 Sunset Blvd, West Hollywood, CA 90069",
      email: "reelwheels4@gmail.com",
      latitude: 34.09,
      longitude: -118.386627,
      phoneNumber: "323-655-6205",
      image:
        "https://s1.it.atcdn.net/wp-content/uploads/2015/05/shutterstock_186048416WeHo.jpg",
    },
    {
      Location: "Chicago",
      Address: "1438 N Milwaukee Ave, Chicago, IL 60622",
      email: "reelwheels5@gmail.com",
      latitude: 41.908217,
      longitude: -87.677137,
      phoneNumber: "312-300-0562",
      image:
        "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iBSTwLG79Zl8/v5/-1x-1.jpg",
    },
    {
      Location: "London",
      Address: "2/3 Peter St, London W1F 0AA, United Kingdom",
      email: "reelwheels6@gmail.com",
      latitude: 51.5143,
      longitude: -0.1312,
      phoneNumber: "+44 207-437-0493",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f5/de/london.jpg?w=1400&h=1400&s=1",
    },
    {
      Location: "Paris",
      Address: "20 Rue Barbette, 75003 Paris, France",
      email: "reelwheels7@gmail.com",
      latitude: 48.8598,
      longitude: 2.3626,
      phoneNumber: "+33 1 43 48 80 14",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1400&h=1400&s=1",
    },
    {
      Location: "Milan",
      Address: "Corso Garibaldi, 20, 20121 Milano MI, Italy",
      email: "reelwheels8@gmail.com",
      latitude: 45.4789,
      longitude: 9.1926,
      phoneNumber: "+39 02 84349776",
      image:
        "https://i.natgeofe.com/n/485b2f58-8e2b-4633-a1c5-658bf513e53e/alps-milan-italy_16x9.jpg",
    },
    {
      Location: "Berlin",
      Address: "Torstraße 74, 10119 Berlin, Germany",
      email: "reelwheels9@gmail.com",
      latitude: 52.5292,
      longitude: 13.401,
      phoneNumber: "+49 030 27013724",
      image:
        "https://www.zicasso.com/static/fc7ac8652d1d916ad0d3be6a1ee37a06/6d821/fc7ac8652d1d916ad0d3be6a1ee37a06.jpg",
    },
    {
      Location: "Shibuya",
      Address:
        "Japan, 〒150-0041 Tokyo, Shibuya City, Jinnan, 1 Chome−18−2, Frame Jinnan-zaka, 1 F",
      email: "reelwheels10@gmail.com",
      latitude: 35.661751,
      longitude: 139.703081,
      phoneNumber: "03-5428-4393",
      image:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpYnV5YXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      Location: "Osaka",
      Address: "1 Chome-9-8 Minamihorie, Nishi Ward, Osaka, 550-0015, Japan",
      email: "reelwheels11@gmail.com",
      latitude: 34.678395,
      longitude: 135.49892,
      phoneNumber: "06-6533-0705",
      image:
        "https://blog.sakura.co/wp-content/uploads/2023/03/Sakuraco_osaka6-1.jpg",
    },
    {
      Location: "Harajuku",
      Address:
        "Japan, 〒150-0001 Tokyo, Shibuya City, Jingumae, 4 Chome-32-7 神崎ビル 2 F",
      email: "reelwheels12@gmail.com",
      latitude: 35.6702,
      longitude: 139.704057,
      phoneNumber: "03-5771-0090",
      image:
        "https://www.gotokyo.org/en/story/guide/shibuya-shop/images/shibuyashopping_main.jpg",
    },
    {
      Location: "Fukuoka",
      Address:
        "Japan, 〒810-0041 Fukuoka, Chuo Ward, Daimyo, 1 Chome-15-35 ２４７ビル 1 F",
      email: "reelwheels13@gmail.com",
      latitude: 33.589606,
      longitude: 130.396423,
      phoneNumber: "092-732-5002",
      image:
        "https://a3.cdn.japantravel.com/photo/290-216180/1440x960!/fukuoka-fukuoka-prefecture-216180.jpg",
    },
    {
      Location: "Daikanyama",
      Address:
        "Japan, 〒150-0034 Tokyo, Shibuya City, Daikanyamacho, 1−6, Hirota Daikanyama Building, 1 F",
      email: "reelwheels14@gmail.com",
      latitude: 35.648888,
      longitude: 139.703534,
      phoneNumber: "03-5456-0085",
      image:
        "https://byfood.b-cdn.net/api/public/assets/9407/content?optimizer=image",
    },
    {
      Location: "Nagoya",
      Address:
        "Japan, 〒460-0008 Aichi, Nagoya, Naka Ward, Sakae, 3 Chome-13-28 1 F",
      email: "reelwheels15@gmail.com",
      latitude: 35.171238,
      longitude: 136.905157,
      phoneNumber: "052-261-2858",
      image:
        "https://content.r9cdn.net/rimg/dimg/68/67/c5247216-city-2121-165f3326118.jpg?width=1366&height=768&xhint=2169&yhint=1514&crop=true",
    },
    {
      Location: "Seoul",
      Address: "648 Sinsa-dong, Gangnam District, Seoul, South Korea",
      email: "reelwheels16@gmail.com",
      latitude: 37.524,
      longitude: 127.0226,
      phoneNumber: "+82-02-2138-0948",
      image: "https://live.staticflickr.com/7681/16652884083_6b0596626b_b.jpg",
    },
    {
      Location: "Shanghai",
      Address: "No.291 Fumin Road Xuhui District, 2000030. Shanghai, China",
      email: "reelwheels17@gmail.com",
      latitude: 31.2208,
      longitude: 121.4513,
      phoneNumber: "+86-021-6025-0570",
      image:
        "https://www.outlooktravelmag.com/media/shanghai-1-1582544504.profileImage.2x-scaled.webp",
    },
  ];

  for (const theaterData of theatersData) {
    const theater = await prisma.theater.upsert({
      where: { email: theaterData.email },
      update: theaterData,
      create: theaterData,
    });
    console.log("Created or updated theater:", theater);

    // Grab all movies from MovieAPI table and shuffle them
    let movies = await prisma.movieAPI.findMany({});
    shuffleArray(movies);

    // Select the first 5 movies from the shuffled list
    movies = movies.slice(0, 5);

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
