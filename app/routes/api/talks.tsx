import type { LoaderFunction } from "@remix-run/node";
import type { DbTalk } from "~/server-models";
import { findTalks } from "~/server-models";

interface LoaderData {
  talks: DbTalk[];
}
export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return { talks: await findTalks() };
};
