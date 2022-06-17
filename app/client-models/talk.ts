import { Talk as DbTalk } from "@prisma/client";

export type Talk = Omit<DbTalk, "date"> & {
  date: Date;
  prettyDate: string;
  isUpcoming: boolean;
};
