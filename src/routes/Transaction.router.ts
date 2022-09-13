import express from "express";
import { transaction } from "../controllers/Transaction.controller";

const transactionRouter = express.Router();

transactionRouter.post("/", transaction);
// transactionRouter.post("/transfer", transfer);

export { transactionRouter };
