import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

class AuthService {
  /**
   * Finds a user by their email address in the database
   * @param email - User's email address to search for
   * @returns Promise containing the found user or null if not found
   */
  static findUser = async (email: string): Promise<any> => {
    return await User.findOne({ email });
  };

  /**
   * Creates a new user with hashed password
   * @param email - User's email address
   * @param password - User's plain text password to be hashed
   * @returns Promise containing the newly created user
   */
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

export default AuthService;
