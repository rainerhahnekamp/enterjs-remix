import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import primeTheme from "primereact/resources/themes/lara-light-indigo/theme.css";
import primeCore from "primereact/resources/primereact.min.css";
import primeIcons from "primeicons/primeicons.css";
import { getUser } from "./session.server";
import { Header } from "~/components/header";
import type { User } from "@prisma/client";
import { findTalks } from "~/models/talk.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  { rel: "stylesheet", href: primeTheme },
  { rel: "stylesheet", href: primeCore },
  { rel: "stylesheet", href: primeIcons },

  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Lectio: Talks & more",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<User | null>;
  talksCount: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
    talksCount: (await findTalks()).length,
  });
};

export default function App() {
  const { talksCount } = useLoaderData<LoaderData>();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="min-h-full">
          <Header talksCount={talksCount} />
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
