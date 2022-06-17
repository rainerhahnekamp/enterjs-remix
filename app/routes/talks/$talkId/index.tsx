import { Fieldset } from "primereact/fieldset";
import { dummyTalk } from "~/client-models";

export default function TalkIndex() {
  const talk = dummyTalk();
  return (
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
  );
}
