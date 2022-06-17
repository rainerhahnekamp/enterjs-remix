import { Talk } from "@prisma/client";
import { format, isAfter, isSameDay, parseJSON } from "date-fns";

export function toPrettyTalk(talk: Talk) {
  const now = new Date();
  const date = parseJSON(talk.date);

  return {
    ...talk,
    date,
    prettyDate: format(date, "dd.MM.y"),
    isUpcoming: isSameDay(date, now) || isAfter(date, now),
  };
}
