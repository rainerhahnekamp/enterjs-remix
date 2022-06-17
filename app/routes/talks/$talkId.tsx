import { dummyTalk } from "~/client-models/talk";
import { Link, Outlet } from "@remix-run/react";
import { Badge } from "primereact/badge";

export default function TalkDetail() {
  const talk = dummyTalk();
  const commentsCount = 1;
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
