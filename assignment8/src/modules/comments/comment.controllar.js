import { Router } from "express";
import { createBulkComments, findOrCreateComment, getallcomments,  getcommentDetils,  newest,  searchWord,  updateComment } from "./comment.service.js";

const commentRouter = Router();

commentRouter.get("/all",getallcomments)
commentRouter.post("/bulk", createBulkComments);
commentRouter.patch("/:commentId", updateComment);
commentRouter.post("/:commentId", findOrCreateComment);
commentRouter.get("/serchword", searchWord);
commentRouter.get("/newest/:postId", newest);
commentRouter.get("/detils/:commentId", getcommentDetils);
export default commentRouter;