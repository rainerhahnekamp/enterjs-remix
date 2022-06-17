import { LoaderFunction } from "@remix-run/node";
import { Talk } from "@prisma/client";
import { PrettyTalk } from "~/client-models/pretty-talk";
import { format, isAfter, isSameDay, parseJSON } from "date-fns";
import { sortBy } from "lodash";
import { useLoaderData } from "@remix-run/react";
import { TalkList } from "~/components/talk-list";
import { findTalks } from "~/models/talk.server";

function toPrettyTalk(talk: Talk) {
  const now = new Date();
  const date = parseJSON(talk.date);

  return {
    ...talk,
    date,
    prettyDate: format(date, "dd.MM.y"),
    isUpcoming: isSameDay(date, now) || isAfter(date, now),
  };
}

function toTalkList(talks: Talk[]) {
  const past: PrettyTalk[] = [];
  const upcoming: PrettyTalk[] = [];

  for (const talk of talks) {
    const prettyTalk: PrettyTalk = toPrettyTalk(talk);

    if (prettyTalk.isUpcoming) {
      upcoming.push(prettyTalk);
    } else {
      past.push(prettyTalk);
    }
  }

  return {
    past: sortBy(past, "date").reverse(),
    upcoming: sortBy(upcoming, "date"),
  };
}

export const loader: LoaderFunction = async () => {
  const talks = await findTalks();
  return toTalkList(talks);
};

export default function TalksIndex() {
  const talkList = useLoaderData();
  return <TalkList prettyTalks={talkList}></TalkList>;
}
