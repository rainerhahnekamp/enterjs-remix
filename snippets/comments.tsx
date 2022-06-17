import { Form } from "@remix-run/react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import type { Comment } from "~/client-models";

export default function CommentsIndex() {
  const comments: Comment[] = [];
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
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Add Comment</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
