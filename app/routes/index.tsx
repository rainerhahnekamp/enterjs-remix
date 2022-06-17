import { useOptionalUser } from "~/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

export default function Index() {
  const user = useOptionalUser();
  return (
    <p>Welcome to Lectio. On this page you will a list of different technical talks.</p>
    );
  const a = (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold text-gray-900">Lectio</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            This is a website to manage talks
          </div>
        </div>
      </main>
    </div>
  );
}
