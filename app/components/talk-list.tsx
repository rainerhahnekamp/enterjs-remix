import { TalkCard } from "~/components/talk-card";
import { Link } from "@remix-run/react";
import { PrettyTalks } from "~/client-models/pretty-talks";

export interface TalkListProps {
  prettyTalks: PrettyTalks;
}

export function TalkList({ prettyTalks: { upcoming, past } }: TalkListProps) {
  return (
    <div>
      <h2 className="py-6 text-3xl font-bold">Past and upcoming talks</h2>
      <Link className="p-button" to="./add">
        Add a new Talk
      </Link>
      <h3 className="mt-6 mb-3 text-2xl font-bold">Upcoming</h3>
      <div className="grid grid-cols-3 gap-5">
        {upcoming.map((talk) => (
          <TalkCard key={talk.id} talk={talk}></TalkCard>
        ))}
      </div>

      <h3 className="mt-6 mb-3 text-2xl font-bold">Past</h3>
      <div className="grid grid-cols-3 gap-5">
        {past.map((talk) => (
          <TalkCard key={talk.id} talk={talk}></TalkCard>
        ))}
      </div>
    </div>
  );
}
