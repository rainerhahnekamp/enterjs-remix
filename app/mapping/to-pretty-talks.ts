import { Talk } from "@prisma/client";
import { PrettyTalk } from "~/client-models/pretty-talk";
import { sortBy } from "lodash";
import { toPrettyTalk } from "~/mapping/to-pretty-talk";

export function toPrettyTalks(talks: Talk[]) {
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
