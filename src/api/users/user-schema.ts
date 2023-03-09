import mongoose, { Schema } from 'mongoose';

export interface User {
  firstName: string;
  secondName: string;
  email: string;
  phone: string;
  pic: string;
}

const userSchema = new Schema<User>({
  firstName: String,
  secondName: String,
  email: String,
  phone: String,
  pic: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
