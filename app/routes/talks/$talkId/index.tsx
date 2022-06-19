import { Fieldset } from "primereact/fieldset";
import { Talk } from "~/client-models";
import { findCommentsByTalkId, findTalkById } from "~/server-models";
import { json } from "@remix-run/server-runtime";
import { LoaderFunction } from "@remix-run/node";
import { toTalk } from "~/mapping/to-talk";
import { useLoaderData } from "@remix-run/react";

interface LoaderData {
  talk: Talk;
  commentsCount: number;
}

export const loader: LoaderFunction = async ({ params }) => {
  const talkId = +(params.talkId || "0");
  if (talkId === 0) {
    throw new Error("talkId is missing");
  }

  const talk = await findTalkById(talkId);
  if (talk === null) {
    throw new Error("talk does not exist");
  }
  const comments = await findCommentsByTalkId(talkId);

  return json<LoaderData>({
    talk: toTalk(talk),
    commentsCount: comments.length,
  });
};

export default function TalkDetailIndex() {
  const { talk, commentsCount } = useLoaderData<LoaderData>();
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
