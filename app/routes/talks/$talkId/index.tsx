import { Talk } from "~/client-models";
import { json, LoaderFunction } from "@remix-run/node";
import { toTalk } from "~/mapping/to-talk";
import { useLoaderData } from "@remix-run/react";
import { Fieldset } from "primereact/fieldset";
import { findTalkById } from "~/server-models";

type LoaderData = Talk;

export const loader: LoaderFunction = async ({ params }) => {
  const talkId = +(params.talkId || "0");

  if (talkId === 0) {
    throw new Error("invalid talkid in route");
  }

  const dbTalk = await findTalkById(talkId);
  if (dbTalk === null) {
    throw new Error("invalid talk");
  }
  const talk: Talk = toTalk(dbTalk);

  return json<LoaderData>(talk);
};

export default function TalkIndex() {
  const talk = useLoaderData<LoaderData>();
  return (
    <div>
      <Fieldset className="mt-4 p-4" legend="Abstract">
        <p>{talk.abstract}</p>
      </Fieldset>
      <Fieldset className="mt-4 p-4" legend="Location">
        <p>{talk.event}</p>
      </Fieldset>
      <Fieldset className="mt-4 p-4" legend="Date">
        <p>{talk.prettyDate}</p>
      </Fieldset>
    </div>
  );
}
