import bcrypt from "bcryptjs";
import { JsonWebTokenError } from "jsonwebtoken";
import { TransactionTypes } from "src/entity/Transaction.entity";
import { AppDataSource } from "../data-source";
// import jwt from "jsonwebtoken";
import { User } from "../entity/User.entity";

export const getAllUsers = async (req: any, res: any, next: any) => {
  const { accounts, transactions } = req.query;
  console.log(req.query.accounts);
  const users = await AppDataSource.getRepository(User).find({
    relations: {
      accounts: accounts ? JSON.parse(accounts) : false,
      transactions: transactions ? JSON.parse(transactions) : false,
    },
  });
  return res.json(users);
};

export const getUser = async (req: any, res: any, next: any) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id } });
  return res.json(user);
};

export const deleteUser = async (req: any, res: any, next: any) => {
  const { id } = req.params;
  const deleteUser = await User.delete(id);
  return res.json({ message: "user deleted" });
};

export const editUser = (req: any, res: any, next: any) => {};

export const changeUserState = (req: any, res: any, next: any) => {};
