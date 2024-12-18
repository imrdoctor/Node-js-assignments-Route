import { Router } from "express";
import { getallusers, getUserByEmail, getuserdata, signup, updateCrate } from "./user.service.js";

const usersRouter = Router();

usersRouter.get("/all",getallusers)
usersRouter.post("/signup",signup)
usersRouter.put("/:id",updateCrate)
usersRouter.get("/by-email", getUserByEmail);
usersRouter.get("/:id", getuserdata);
export default usersRouter;