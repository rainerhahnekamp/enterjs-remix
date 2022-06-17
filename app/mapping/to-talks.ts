import { sortBy } from "lodash";
import type { Talk } from "~/client-models";
import { toTalk } from "~/mapping/to-talk";
import { DbTalk } from "~/server-models";

export function toTalks(talks: DbTalk[]) {
  const past: Talk[] = [];
  const upcoming: Talk[] = [];

  for (const talk of talks) {
    const prettyTalk: Talk = toTalk(talk);

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
