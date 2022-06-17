import { LoaderFunction } from "@remix-run/node";
import { findTalks, Talk } from "~/models/talk.server";

interface LoaderData {
  talks: Talk[];
}
export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return { talks: await findTalks() };
};
