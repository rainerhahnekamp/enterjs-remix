import { prisma } from "~/db.server";
import { Comment } from "@prisma/client";

export type { Comment } from "@prisma/client";

export function findCommentsByTalkId(talkId: number): Promise<Comment[]> {
  return prisma.comment.findMany({ where: { talkId } });
}

export function addComment(content: string, talkId: number): Promise<Comment> {
  return prisma.comment.create({ data: { content, talkId } });
}
