import { model, Schema } from "mongoose";

interface IPost {
  title: string;
  content: string;
  author: string;
}

const PostSchema: Schema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
});

const Post = model<IPost>("Post", PostSchema);

export default Post;
