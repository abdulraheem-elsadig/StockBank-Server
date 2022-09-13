import { Database, Resource } from "@adminjs/typeorm";
import AdminJSExpress from "@adminjs/express";
import AdminJS from "adminjs";

import { User } from "./entity/User.entity";
import { Transaction } from "./entity/Transaction.entity";
import { Account } from "./entity/Account.entity";

AdminJS.registerAdapter({ Database, Resource });

export const options = {
  resources: [User, Transaction, Account],
};

export const buildAdminRouter = (admin: any) => {
  const router = AdminJSExpress.buildRouter(admin);
  return router;
};
