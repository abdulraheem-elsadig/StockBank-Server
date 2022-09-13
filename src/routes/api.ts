import express from "express";
import { authRouter } from "./auth";
import { transactionRouter } from "./Transaction.router";
import { usersRouter } from "./user";

const api = express.Router();

api.use("/users", usersRouter);
api.use("/auth", authRouter);
api.use("/transaction", transactionRouter);

export { api };
