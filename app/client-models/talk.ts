import { Talk as DbTalk } from "@prisma/client";

export type Talk = Omit<DbTalk, "date" | "createdAt" | "updatedAt"> & {
  date: Date;
  prettyDate: string;
  isUpcoming: boolean;
};

export function dummyTalk(): Talk {
  return {
    id: 1,
    name: "A talk",
    date: new Date(),
    isUpcoming: true,
    prettyDate: "soon",
    event: "somewhere",
    abstract: "Some text here",
    language: "es",
    userId: "user",
    slidesUrl: "",
    recordingUrl: "",
  };
}
