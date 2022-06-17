import { prisma } from "../db.server";
import { Talk } from "@prisma/client";

export type { Talk } from "@prisma/client";

export async function findTalks(): Promise<Talk[]> {
  return prisma.talk.findMany();
}

export async function findTalkById(id: number): Promise<Talk | null> {
  return prisma.talk.findUnique({ where: { id } });
}
