import { PrettyTalk } from "~/client-models/pretty-talk";
import { json, LoaderFunction } from "@remix-run/node";
import { findTalkById } from "~/models/talk.server";
import { toPrettyTalk } from "~/mapping/to-pretty-talk";
import { useLoaderData } from "@remix-run/react";
import { Fieldset } from "primereact/fieldset";

type LoaderData = PrettyTalk;

export const loader: LoaderFunction = async ({ params }) => {
  const talkId = +(params.talkId || "0");

  if (talkId === 0) {
    throw new Error("invalid talkid in route");
  }

  const talk = await findTalkById(talkId);
  if (talk === null) {
    throw new Error("invalid talk");
  }
  const prettyTalk: PrettyTalk = toPrettyTalk(talk);

  return json<LoaderData>(prettyTalk);
};

export default function TalkIndex() {
  const prettyTalk = useLoaderData<LoaderData>();
  return (
    <div>
      <Fieldset className="mt-4 p-4" legend="Abstract">
        <p>{prettyTalk.abstract}</p>
      </Fieldset>
      <Fieldset className="mt-4 p-4" legend="Location">
        <p>{prettyTalk.event}</p>
      </Fieldset>
      <Fieldset className="mt-4 p-4" legend="Date">
        <p>{prettyTalk.prettyDate}</p>
      </Fieldset>
    </div>
  );
}
