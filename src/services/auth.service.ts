import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

class AuthService {
  static findUser = async (email: string): Promise<any> => {
    console.log(email);
    
    return await User.findOne({ email })
  };

  static createUser = async (
    email: string,
    password: string
  ): Promise<IUser> => {
    console.log(email, password);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = { email, password: hashedPassword };

    User.create(newUser);
    return newUser;
  };
}

export default AuthService
