import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TalkList } from "~/components/talk-list";
import { findTalks } from "~/server-models";
import { toTalks } from "~/mapping/to-talks";
import type { Talks } from "~/client-models";

export type LoaderData = Talks;

export const loader: LoaderFunction = async () => {
  const talks = await findTalks();
  return json<LoaderData>(toTalks(talks));
};

export default function TalksIndex() {
  const talkList = useLoaderData<LoaderData>();
  return <TalkList prettyTalks={talkList}></TalkList>;
}
