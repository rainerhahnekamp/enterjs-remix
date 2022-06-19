import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import type { Comment } from "~/client-models";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { addComment, findCommentsByTalkId } from "~/server-models";
import { json } from "@remix-run/server-runtime";
import { formatDistance } from "date-fns";

type LoaderData = Comment[];
export const loader: LoaderFunction = async ({ params }) => {
  const talkId = +(params.talkId || "0");
  if (talkId === 0) {
    throw new Error("talkId is missing");
  }

  const comments = await findCommentsByTalkId(talkId);
  return json<LoaderData>(
    comments.map((comment) => ({
      ...comment,
      prettyDate: formatDistance(new Date(), comment.createdAt),
    }))
  );
};

interface ActionData {
  content?: boolean;
}

export const action: ActionFunction = async ({ params, request }) => {
  const talkId = +(params.talkId || "0");
  if (talkId === 0) {
    throw new Error("talkId is missing");
  }

  const formData = await request.formData();
  const content = formData.get("content");
  if (typeof content !== "string" || content === "") {
    return json<ActionData>({ content: true });
  }

  await addComment(content, talkId);
  return json<ActionData>({});
};

export default function CommentsIndex() {
  const comments = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const talkId = 0;
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
            />{" "}
            {actionData?.content ? (
              <p className="text-red-600">Field is required</p>
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
