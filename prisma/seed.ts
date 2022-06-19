const { PrismaClient, Talk } = require("@prisma/client");
const bcrypt = require("bcryptjs");

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

  async function createTalks(talks) {
    for (const talk of talks) {
      await prisma.talk.create({ data: talk });
    }
  }

  await createTalks([
    {
      name: "Implementing the Observable",
      abstract: `If you want to fully understand something, you have to write it on your own. 

We will implement our own version of an Observable, the core element in RxJs. But not just the subscribe method. We include all major features from the original as well.

We apply TDD. So if you want to have the full experience, you can copy the tests and implement your own personal Observable after this talk.

Either way, you will definitely have a more profound understanding of RxJs and specifically of the Observable.`,
      userId: user.id,
      language: "en",
      date: new Date(2022, 6, 18),
      event: "Angular Kenya Meetup",
    },
    {
      name: "Angular Testing Powertools",
      abstract: `Das TestBed ist für Tests in Angular unumgänglich. Leider sind die resultierenden Tests häufig auch sehr lange und damit schlecht lesbar. Bibliotheken wie Spectator, Testing Library oder die Angular-hauseigenen Harnesses versprechen Besserung. Aber können sie das auch wirklich einhalten und wie unterscheiden sie sich voneinander?
Antworten dazu mit Best Practices und Live-Coding findest du in meinem Vortrag.`,
      userId: user.id,
      language: "de",
      date: new Date(2022, 9, 13),
      event: "Basta",
    },
    {
      name: `Playwright: Anstehende Wachablöse für Cypress?`,
      abstract: `In der E2E-Testwelt gibt es einen unangefochtenen Spitzenreiter: Cypress. Playwright als potenzieller Herausforderer bietet Features, die man bei Cypress schmerzlich vermisst. Das sind zum Beispiel Cross-Domain-Tests oder Unterstützung für Safari und Chrome for Android. Gleichzeitig möchte aber Playwright dieselbe Developer Experience anbieten, die man bei Cypress liebt und schätzt. Steht also eine Wachablöse bevor?

In dem Vortrag erwartet Teilnehmer:innen ein Rundumblick auf Stärken und Schwächen von Playwright mit Bezug zu Cypress.`,
      userId: user.id,
      language: "de",
      date: new Date(2022, 5, 23),
      event: "enterJS",
    },
    {
      name: "Future of Frontend Development",
      abstract: `React, Vue & Angular have positioned themselves as the "Big 3" frameworks for frontend development for the last couple of years. They still add new features, but not at that rate compared to the early days. So did we already reach the peak?
On the contrary! Svelte's compiler approach, React's Server Components or esbuild's performance (via not using JavaScript) are groundbreaking changes that will shape the next generation. If the "Big 3" will adopt or vanish, is another topic...
Join my talk and see how these new approaches expand the frontiers even more.`,
      userId: user.id,
      language: "en",
      date: new Date(2022, 5, 14),
      event: "WeAreDevelopers Congress",
    },
    {
      name: "White Label & Customization Patterns",
      abstract: `Imagine your product manager asks you to reuse your wonderful Angular app under a different brand: "It will be just a different logo and some different colors. Easy job for you, right?"As we all know, that's just the beginning. It continues with further layout changes, adding new features or modifying existing ones. That's definitely not easy anymore. In my talk, I'll show you multiple design patterns/strategies for white label solutions. You will see how to unleash the full potential of the Angular framework to make your application as much customizable as possible.`,
      userId: user.id,
      language: "en",
      date: new Date(2022, 4, 24),
      event: "Angular Meetup Graz",
    },
    {
      name: "sam4sc - Semi-Automatic Migration 4 Standalone Components",
      abstract: `Standalone Components are coming. They will simplify our Angular applications but only if our application is ready for it. The path is quite clear: You need to define your component's dependencies individually. If your current NgModules declare multiple components, this means a lot of work.

Entering Sam-4S. "It stands for Semi-Automatic Migrator for Standalone (Components)". A tool that will automatize as much as possible in order to make your application ready for a time without NgModules.`,
      userId: user.id,
      language: "en",
      date: new Date(2022, 1, 10),
      event: "Angular Meetup Graz",
    },
    {
      name: "RxJS 7 - One Share to Rule them all (Deep Dive)",
      abstract: `A deep dive about the revised share operator in RxJs 7. This new version can already be used with Angular 12. So it's time to see what changes are coming for Angular developers.

The biggest change is the consolidation of all multicast operators into one share operator. In this talk, I will take apart the shared operator and its configuration and develop a mini version live. After that, multicasting with RxJs with all its variants should no longer be a problem.`,
      userId: user.id,
      language: "en",
      date: new Date(2022, 0, 18),
      event: "Angular Community Meetup Europe",
    },
  ]);

  const remixTalk = {
    name: "Remix: Yet Another Framework oder mehr?",
    abstract: `Wer den sozialen Netzwerken folgt, kommt in letzter Zeit um Remix nicht herum. Wie Next.js ist Remix ein React-basiertes Full-Stack-Framework. Ähnlich wie bei den React Server Components werden ein Teil des Renderings und die Kommunikation mit einer API oder Datenbank bereits am Server durchgeführt.

Wie das genau funktioniert und was Remix dadurch anderen Frameworks voraus hat, wird dieser Vortrag mit Live-Coding beleuchten.`,
    userId: user.id,
    language: "de",
    date: new Date(2022, 5, 22),
    event: "enterJS",
  };
  const { id } = await prisma.talk.create({ data: remixTalk });

  await prisma.comment.create({
    data: { talkId: id, content: "Ist da jemand???" },
  });

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
