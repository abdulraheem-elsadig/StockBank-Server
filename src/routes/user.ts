import express from "express";
import { deleteUser, getAllUsers, getUser } from "../controllers/Users";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUser);
usersRouter.delete("/:id", deleteUser);

export { usersRouter };
