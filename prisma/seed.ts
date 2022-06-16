import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rainer.hahnekamp@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("ibinacool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  type CreateTalk = Parameters<typeof prisma.talk.create>[0]["data"];

  const createTalks = (talks: CreateTalk[]) => {
    for (const talk of talks) {
      prisma.talk.create({ data: talk });
    }
  };

  createTalks([
    {
      name: "Future of Frontend Development",
      abstract: `React, Vue & Angular have positioned themselves as the "Big 3" frameworks for frontend development for the last couple of years. They still add new features, but not at that rate compared to the early days. So did we already reach the peak?
On the contrary! Svelte's compiler approach, React's Server Components or esbuild's performance (via not using JavaScript) are groundbreaking changes that will shape the next generation. If the "Big 3" will adopt or vanish, is another topic...
Join my talk and see how these new approaches expand the frontiers even more.`,
      userId: user.id,
    },
    {
      name: "White Label & Customization Patterns",
      abstract: `Imagine your product manager asks you to reuse your wonderful Angular app under a different brand: "It will be just a different logo and some different colors. Easy job for you, right?"As we all know, that's just the beginning. It continues with further layout changes, adding new features or modifying existing ones. That's definitely not easy anymore. In my talk, I'll show you multiple design patterns/strategies for white label solutions. You will see how to unleash the full potential of the Angular framework to make your application as much customizable as possible.`,
      userId: user.id,
    },
  ]);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
