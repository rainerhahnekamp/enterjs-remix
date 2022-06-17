import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <p>
      Welcome to Lectio. On this page you will a list of different technical
      talks.
    </p>
  );
}
