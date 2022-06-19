import { Link } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const TalksBreadcrumb = () => (
  <nav className="p-breadcrumb p-component mb-4">
    <ul>
      <Link className="p-breadcrumb-home" to="/">
        Home
      </Link>
      <FontAwesomeIcon className="px-4" icon={faChevronRight}></FontAwesomeIcon>
      <Link className="p-menuitem" to=".">
        Talks Overview
      </Link>
    </ul>
  </nav>
);
