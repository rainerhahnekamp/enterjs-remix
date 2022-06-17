import { prisma } from "../db.server";
import type { Talk as DbTalk } from "@prisma/client";

export type { Talk as DbTalk } from "@prisma/client";

export async function findTalks(): Promise<DbTalk[]> {
  return prisma.talk.findMany();
}

export async function findTalkById(id: number): Promise<DbTalk | null> {
  return prisma.talk.findUnique({ where: { id } });
}
