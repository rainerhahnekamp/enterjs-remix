import { Link } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "primereact/badge";

export interface HeaderProps {
  talksCount: number;
}

export const Header = ({ talksCount }: HeaderProps) => (
  <nav className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-3xl text-white">
            <Link to=".">
              <FontAwesomeIcon className="mr-4" icon={faLightbulb} />
              Lectio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="./talks"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
              >
                <span className="pr-2">Talks</span>
                <Badge value={talksCount}></Badge>
              </Link>

              <Link
                to="./settings"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
              >
                Settings
              </Link>

              <Link
                to="./about"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
