import { LoaderFunction } from "@remix-run/node";
import { Talk } from "@prisma/client";
import { PrettyTalk } from "~/client-models/pretty-talk";
import { format, isAfter, isSameDay, parseJSON } from "date-fns";
import { sortBy } from "lodash";
import { useLoaderData } from "@remix-run/react";
import { TalkList } from "~/components/talk-list";

function toTalkList(data: { talks: Talk[] }) {
  const now = new Date();
  const past: PrettyTalk[] = [];
  const upcoming: PrettyTalk[] = [];

  for (const talk of data.talks) {
    const date = parseJSON(talk.date);
    const prettyTalk: PrettyTalk = {
      ...talk,
      date,
      prettyDate: format(date, "dd.MM.y"),
      isUpcoming: isSameDay(date, now) || isAfter(date, now),
    };

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
  return fetch("http://localhost:3000/api/talks")
    .then((res) => res.json())
    .then(toTalkList);
};

export default function TalksIndex() {
  const talkList = useLoaderData();
  return <TalkList talks={talkList}></TalkList>;
}
