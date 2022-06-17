import { Talk } from "@prisma/client";

export type PrettyTalk = Omit<Talk, "date"> & { prettyDate: string };
