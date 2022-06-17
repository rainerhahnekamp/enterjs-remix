import { useEffect, useState } from "react";
import { TalkList } from "~/components/talk-list";
import { Talk } from "@prisma/client";
import { format, parseJSON } from "date-fns";
import { PrettyTalk } from "~/client-models/pretty-talk";

export const TalkListContainer = () => {
  const [talks, setTalks] = useState<PrettyTalk[]>([]);

  useEffect(() => {
    fetch("/api/talks")
      .then((res) => res.json())
      .then((data: { talks: Talk[] }) =>
        data.talks.map((talk) => ({
          ...talk,
          prettyDate: format(parseJSON(talk.date), "dd.MM.y"),
        }))
      )
      .then(setTalks);
  }, []);

  return <TalkList talks={talks}></TalkList>;
};
