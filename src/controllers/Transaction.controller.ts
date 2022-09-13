import { Account } from "../entity/Account.entity";
import { Transaction } from "../entity/Transaction.entity";
import { User } from "../entity/User.entity";

export const transaction = async (req: any, res: any, next: any) => {
  const { type, iban, userId, amount } = req.body;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.json({ message: "User not found" });
  }
  const account = await Account.findOne({ where: { iban: iban } });
  if (!account) {
    return res.json({ message: "Account not found" });
  }
  if (type != "withdraw" && type != "deposit") {
    return res.json({ message: "unknown transaction type" });
  }
  if (type == "withdraw" && amount > account.balance) {
    return res.json({
      message: `you dont have enough palace you currently have ${account.balance}`,
    });
  }
  const newTransaction = Transaction.create({
    type,
    amount,
    currency: account.accountType,
    balance:
      type == "withdraw"
        ? +account.balance - +amount
        : +account.balance + +amount,
  });
  newTransaction.user = user;
  await newTransaction.save();

  account.balance =
    type == "withdraw"
      ? +account.balance - +amount
      : +account.balance + +amount;
  account.save();

  await user.save();
  return res.json(account);
};

// export const transfer = async (req: any, res: any, next: any) => {
//   const { from, to, amount } = req.body;
//   const fromUser = await User.findOne({ where: { id: from } });
//   const toUser = await User.findOne({ where: { id: to } });

//   // check users
//   if (!fromUser) {
//     return res.json({ message: `user id ${from} is invalid` });
//   }

//   if (!toUser) {
//     return res.json({ message: `no user found with id ${to}` });
//   }

//   // create transaction
//   const fromTransaction = Transaction.create({
//     type: "withdraw",
//     amount,
//     balance: +fromUser.balance - +amount,
//   });
//   await fromTransaction.save();

//   const toTransaction = Transaction.create({
//     type: "deposit",
//     amount,
//     balance: +fromUser.balance + +amount,
//   });
//   await toTransaction.save();

//   // update users
//   fromUser.balance = +fromUser.balance - +amount;
//   fromUser.transaction = fromTransaction;
//   await fromUser.save();

//   toUser.balance = +toUser.balance + +amount;
//   toUser.transaction = toTransaction;
//   await toUser.save();

//   return res.json(fromUser);
// };
