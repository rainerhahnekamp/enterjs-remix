import { prisma } from "~/db.server";
import type { Comment as DbComment } from "@prisma/client";

export type { Comment as DbComment } from "@prisma/client";

export function findCommentsByTalkId(talkId: number): Promise<DbComment[]> {
  return prisma.comment.findMany({ where: { talkId } });
}

export function addComment(
  content: string,
  talkId: number
): Promise<DbComment> {
  return prisma.comment.create({ data: { content, talkId } });
}
