import { useEffect, useState } from "react";
import { TalkList } from "~/components/TalkList";
import { format, isAfter, isSameDay, parseJSON } from "date-fns";
import { Talk } from "~/client-models";
import { sortBy } from "lodash";

export const TalkListContainer = () => {
  const [talks, setPrettyTalks] = useState<{
    past: Talk[];
    upcoming: Talk[];
  }>({ past: [], upcoming: [] });

  useEffect(() => {
    fetch("/api/talks")
      .then((res) => res.json())
      .then((data: { talks: Talk[] }) => {
        const now = new Date();
        const past: Talk[] = [];
        const upcoming: Talk[] = [];

        for (const talk of data.talks) {
          const date = parseJSON(talk.date);
          const prettyTalk: Talk = {
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
