import React from "react";
import { Talks } from "~/client-models";
import { findTalks } from "~/server-models";
import { toTalks } from "~/mapping/to-talks";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { TalkList } from "~/components/TalkList";

type LoaderData = Talks;

export const loader = async () => {
  const dbTalks = await findTalks();
  return json<LoaderData>(toTalks(dbTalks));
};

export default function TalksIndex() {
  const talks = useLoaderData();
  return <TalkList prettyTalks={talks} />;
}
