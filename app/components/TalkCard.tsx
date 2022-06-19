import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@remix-run/react";
import { Talk } from "~/client-models/talk";
import { Card } from "primereact/card";

export interface TalkCardProps {
  talk: Talk;
}

export function TalkCard({ talk }: TalkCardProps) {
  return (
    <Card title={talk.name}>
      <div className="py-2">
        <p className="py-1 text-gray-900">
          <FontAwesomeIcon icon={faLocationDot} className="pr-2 text-2xl" />
          {talk.prettyDate}
        </p>

        <p className="py-1 text-gray-900">
          <FontAwesomeIcon icon={faCalendarCheck} className="pr-2 text-2xl" />
          {talk.event}
        </p>
      </div>
      {talk.abstract}
      <div className="flex justify-center gap-8 p-4">
        <Link className="p-button" to={"" + talk.id}>
          More Info
        </Link>
      </div>
    </Card>
  );
}
