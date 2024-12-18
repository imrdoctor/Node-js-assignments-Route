import { DBconnection, syncDb } from "./DB/connectionDB.js";
import { defineRelations } from "./DB/models/relations.js";
import commentRouter from "./modules/comments/comment.controllar.js";
import postRouter from "./modules/posts/post.controllar.js";
import usersRouter from "./modules/users/users.controllar.js";

const approot = (app,express)=>{
    app.use(express.json());
    DBconnection()
    defineRelations();
    syncDb()
    app.use("/users", usersRouter);
    app.use("/posts",postRouter)
    app.use("/comments",commentRouter)

    app.use("*", (req, res , next)=>{
        res.status(404).json({message: "404 page not found"});
    });
}
export default approot;