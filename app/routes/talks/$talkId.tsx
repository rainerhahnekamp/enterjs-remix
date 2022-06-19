import { Talk } from "~/client-models/talk";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { findCommentsByTalkId, findTalkById } from "~/server-models";
import { json } from "@remix-run/server-runtime";
import { toTalk } from "~/mapping/to-talk";
import { Badge } from "primereact/badge";

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

export default function TalkDetail() {
  const { talk, commentsCount } = useLoaderData<LoaderData>();
  return (
    <div>
      <h2 className="text-2xl font-bold">{talk.name}</h2>

      <div className="p-tabmenu p-component">
        <ul className="p-tabmenu-nav p-reset">
          <li className="p-tabmenuitem">
            <Link to="." className="p-menuitem-link">
              Detail
            </Link>
          </li>
          <li className="p-tabmenuitem">
            <Link
              to="comments"
              className="p-menuitem-link p-menuitem-text gap-x-2"
            >
              Comments <Badge value={commentsCount} />
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
