import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { IUser, User } from '../models/User';
import { ApiError } from '../utils/ApiError';

const tokenForUser = (userId: string): string => {
  const options: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] };
  return jwt.sign({ userId }, env.jwtSecret, options);
};

export const registerUser = async (name: string, email: string, password: string): Promise<{ user: IUser; token: string }> => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = tokenForUser(user._id.toString());

  return { user, token };
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
  const userWithPassword = await User.findOne({ email }).select('+password');
  if (!userWithPassword) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const matches = await bcrypt.compare(password, userWithPassword.password);
  if (!matches) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = tokenForUser(userWithPassword._id.toString());
  const user = await User.findById(userWithPassword._id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return { user, token };
};
