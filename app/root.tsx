import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import primeTheme from "primereact/resources/themes/lara-light-indigo/theme.css";
import primeCore from "primereact/resources/primereact.min.css";
import primeIcons from "primeicons/primeicons.css";
import { Header } from "~/components/Header";
import { TalkListContainer } from "~/components/TalkListContainer";

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

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="min-h-full">
          <Header talksCount={-1} />
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <TalkListContainer />
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
