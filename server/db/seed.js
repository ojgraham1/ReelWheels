const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("seeding database");

  const maya = await prisma.users.create({
    data: {
      username: "mimmo888",
      password: "lucky",
      firstName: "Maya",
      lastName: "Obeidat",
      email: "mimmo@gmail.com",
      address: "777 Lucky St.",
      phoneNumber: "(770)777-7777",
      birthdate: new Date(2001, 2, 1),
      isAdmin: true,
    },
  });

  console.log(maya);
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
