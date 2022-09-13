import { DataSource } from "typeorm";
import { Account } from "./entity/Account.entity";
import { Transaction } from "./entity/Transaction.entity";
import { User } from "./entity/User.entity";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ec2-54-152-28-9.compute-1.amazonaws.com",
  port: 5432,
  username: "pqxaojhvphdnxi",
  password: "047b64ea073af210f1741226ce53700ab680f8c5c7b87dc839b262dd02d25532",
  database: "d750f4097c8g2d",
  synchronize: true,
  logging: true,
  entities: [User, Transaction, Account],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },

  //   subscribers: [],
  //   migrations: [],
});
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "abdulraheem",
//   password: "1234",
//   database: "stockbank",
//   synchronize: true,
//   logging: true,
//   entities: [User, Transaction, Account],
//   //   subscribers: [],
//   //   migrations: [],
// });
