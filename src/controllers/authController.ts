import User from "../models/User";
import bcrypt from "bcryptjs";

const handleLogin = async (req: any, res: any) => {
  const { email, pwd } = req.body;

  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = await User.findOne({ email: email }).exec();

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    res.status(200).json({ message: "User Found" });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
