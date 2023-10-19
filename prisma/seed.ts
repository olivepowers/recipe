import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const account = {
  id: "olivia",
  type: "credentials",
  provider: "credentials",
  providerAccountId: "olivia",
};

const sessionToken = "oliviawashere";

const userData: Prisma.UserCreateInput[] = [
  {
    id: "olivia",
    name: "Olivia",
    email: "powersog+hi@gmail.com",
    image: "foobar",
    sessions: {
      create: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sessionToken,
      },
    },
    accounts: {
      create: account,
    },
    Recipe: {
      create: [
        {
          title: "Amy's Famous Monster Cookies",
          description: "Delicious cookies",
          picture: "a",
          link: "b",
          ingredients: ["flour", "butter"],
          steps: ["mix", "bake"],
          rating: 4.5,
          hashtags: ["dessert", "cookies"],
          status: "made",
        },
        {
          title: "Pizza",
          description: "mozzarella",
          picture: "c",
          link: "d",
          ingredients: ["flour", "butter"],
          steps: ["mix", "bake"],
          rating: 4.5,
          hashtags: ["italian"],
          status: "made",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
