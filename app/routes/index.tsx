import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <i className="fa-solid fa-lightbulb-exclamation-on"></i>
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
