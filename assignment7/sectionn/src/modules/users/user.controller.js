import { Router } from "express";
import { getusers, signup, login, alterTable, truncateTable } from "./user.service.js";
import { isAdmin } from "../../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/all', getusers);
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/alter-table', isAdmin, alterTable);
userRouter.post('/truncate-table', isAdmin, truncateTable);

export default userRouter;