import { dummyTalk } from "~/client-models/talk";
import { Link } from "@remix-run/react";
import { Fieldset } from "primereact/fieldset";

export default function TalkDetail() {
  const talk = dummyTalk();
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
              Comments
            </Link>
          </li>
        </ul>
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
      </div>
    </div>
  );
}
