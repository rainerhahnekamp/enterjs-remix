import { useEffect, useState } from "react";
import { TalkList } from "~/components/talk-list";
import { Talk } from "@prisma/client";
import { format, isAfter, isSameDay, parseJSON } from "date-fns";
import { PrettyTalk } from "~/client-models/pretty-talk";
import { sortBy } from "lodash";

export const TalkListContainer = () => {
  const [talks, setPrettyTalks] = useState<{
    past: PrettyTalk[];
    upcoming: PrettyTalk[];
  }>({ past: [], upcoming: [] });

  useEffect(() => {
    fetch("/api/talks")
      .then((res) => res.json())
      .then((data: { talks: Talk[] }) => {
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
      })
      .then(setPrettyTalks);
  }, []);

  return <TalkList prettyTalks={talks}></TalkList>;
};
