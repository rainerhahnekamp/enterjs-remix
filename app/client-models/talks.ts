import { Talk } from "~/client-models/talk";

export interface Talks {
  upcoming: Talk[];
  past: Talk[];
}
