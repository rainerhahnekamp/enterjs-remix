import { useEffect, useState } from "react";
import { TalkList } from "~/components/talkList";
import { Talk } from "@prisma/client";

export const TalkListContainer = () => {
  const [talks, setTalks] = useState<Talk[]>([]);

  useEffect(() => {
    fetch("/api/talks")
      .then((res) => res.json())
      .then((data: { talks: Talk[] }) => data.talks)
      .then(setTalks);
  }, []);

  return <TalkList talks={talks}></TalkList>;
};
