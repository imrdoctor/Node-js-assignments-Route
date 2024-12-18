import { Router } from "express";
import { createPost, deletePost, getallPosts, getPostCommentCount, getPostDetails } from "./post.service.js";

const postRouter = Router();

postRouter.get("/all",getallPosts)
postRouter.post("/create",createPost)
postRouter.delete("/delete",deletePost)
postRouter.get("/details/:id", getPostDetails);
postRouter.get("/comment-count/:id", getPostCommentCount);
export default postRouter;

// createBulkComments