import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { addComment, findCommentsByTalkId } from "~/models/comment.server";
import { formatDistance } from "date-fns";
import type { Comment } from "~/client-models/comment";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { sortBy } from "lodash";

export interface LoaderData {
  comments: Comment[];
  talkId: number;
}
export type ActionData = { content?: true; talkId?: true };

export const loader: LoaderFunction = async ({ params }) => {
  const talkId = +(params.talkId || "0");
  if (talkId === 0) {
    throw new Error("wrong talkId");
  }
  const dbComments = await findCommentsByTalkId(talkId);
  const comments = sortBy(
    dbComments.map((comment) => ({
      ...comment,
      prettyDate: formatDistance(new Date(), comment.createdAt) + " ago",
    })),
    "createdAt"
  ).reverse();
  return json<LoaderData>({ comments, talkId });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const content = formData.get("content");
  const talkId = +(formData.get("talkId") || "0");
  if (typeof content !== "string" || content.trim() === "") {
    return json<ActionData>({ content: true });
  }

  if (talkId === 0) {
    return json<ActionData>({ talkId: true });
  }

  await addComment(content, talkId);
  return {};
};

export default function CommentsIndex() {
  const { comments, talkId } = useLoaderData<LoaderData>();
  const actionData = useActionData();

  return (
    <div>
      {comments.map((comment, ix) => (
        <div key={comment.id}>
          {ix ? <Divider /> : ""}
          <Card className="max-w-md" subTitle={comment.prettyDate}>
            {comment.content}
          </Card>
        </div>
      ))}
      <Form method="post">
        <div className="max-w-xs space-y-6">
          <input value={talkId} name="talkId" type="hidden" />
          <div className="body">
            <label htmlFor="content" className="block">
              Comment
            </label>
            <InputTextarea
              id="content"
              className="block w-full"
              name="content"
            />
            {actionData?.content ? (
              <p className="text-red-700">Required Field</p>
            ) : (
              ""
            )}
            {actionData?.talkId ? (
              <p className="text-red-700">TalkId is missing</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-center">
            <Button type="submit">Add Comment</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
