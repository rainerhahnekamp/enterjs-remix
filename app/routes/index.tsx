import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <p>Welcome to Lectio. A collection of talks around software development.</p>
  );
}
