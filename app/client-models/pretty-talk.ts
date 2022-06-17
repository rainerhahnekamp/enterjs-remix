import { Talk } from "@prisma/client";

export type PrettyTalk = Omit<Talk, "date"> & {
  date: Date;
  prettyDate: string;
  isUpcoming: boolean;
};
