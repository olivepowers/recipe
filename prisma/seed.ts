import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Olivia",
    email: "powersog@gmail.com",
    Recipe: {
      create: [
        {
          title: "Amy's Famous Monster Cookies",
          description: "Delicious cookies",
          picture: "ab",
          link: "ab",
          ingredients: ["flour", "butter"],
          steps: ["mix", "bake"],
          rating: 4.5,
          category: "Dessert",
          status: "made",
        },
        {
          title: "Pizza",
          description: "mozzarella",
          picture: "ab",
          link: "ab",
          ingredients: ["flour", "butter"],
          steps: ["mix", "bake"],
          rating: 4.5,
          category: "Dessert",
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
