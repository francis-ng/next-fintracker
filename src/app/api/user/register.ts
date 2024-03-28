import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";

export async function submitRegister(formData: FormData) {
  const HASHVERSION = 2;

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
  const userName = formData.get('username') as string;
  const password = formData.get('password') as string;
  const passwordVerify = formData.get('passwordVerify') as string;

  const user = await users.findOne({UserName: userName});
  if (user) {
    return { message: 'Username already exists' };
  }
  if (password !== passwordVerify) {
    redirect('/user/register')
  }

  const hash = await argon2.hash(password);
  const accessToken = sign({user: userName}, process.env.JWT_ACCESSKEY as string, {expiresIn: '1d'});
  const refreshToken = sign({user: userName}, process.env.JWT_REFRESHKEY as string, {expiresIn: '365d'});

  await users.insertOne({
    UserName: userName,
    Password: hash,
    Version: HASHVERSION
  });

  await client.close();

  return { accessToken: accessToken, refreshToken: refreshToken };
  redirect('/user/login');
};