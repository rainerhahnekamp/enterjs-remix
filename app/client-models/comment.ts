import { Comment as CommentServer } from "../server-models/comment.server";

export type Comment = Pick<CommentServer, "id" | "createdAt" | "content"> & {
  prettyDate: string;
};
