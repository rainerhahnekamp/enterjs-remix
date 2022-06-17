import { Comment as CommentServer } from "../models/comment.server";

export type Comment = Pick<CommentServer, "id" | "createdAt" | "content"> & {
  prettyDate: string;
};
