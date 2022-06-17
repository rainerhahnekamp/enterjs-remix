import { json, LoaderFunction } from "@remix-run/node";
import { findTalkById } from "~/server-models/talk.server";
import { Talk } from "~/client-models/talk";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { toTalk } from "~/mapping/to-talk";
import { findCommentsByTalkId } from "~/server-models/comment.server";
import { Badge } from "primereact/badge";

interface LoaderData {
  talk: Talk;
  commentsCount: number;
}

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

  return json<LoaderData>({
    talk,
    commentsCount: (await findCommentsByTalkId(talkId)).length,
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
              Comments <Badge value={commentsCount}></Badge>
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
