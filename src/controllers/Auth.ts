import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Account } from "../entity/Account.entity";
import { User } from "../entity/User.entity";

export const register = async (req: any, res: any, next: any) => {
  const { firstName, lastName, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  // Create Accouts [Tl , USD, ERO] for user
  const tlAccount = Account.create({
    accountType: "TL",
  });
  await tlAccount.save();

  const usdAccount = Account.create({
    accountType: "USD",
  });
  await usdAccount.save();

  const euroAccount = Account.create({
    accountType: "EURO",
  });
  await euroAccount.save();

  newUser.accounts = [tlAccount, usdAccount, euroAccount];

  await newUser.save();
  return res.json(newUser);
};

export const login = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  const user = await User.findOneBy({
    email: email,
  });

  if (!user) {
    return res.json({ message: "no user found" });
  }

  const isEqual = await bcrypt.compareSync(password, user.password);
  if (!isEqual) {
    return res.json({ message: "Yor email or password mismatch" });
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
    "somesupersecretsecret",
    { expiresIn: "48h" }
  );
  return res.json({ id: user.id, token });
};
