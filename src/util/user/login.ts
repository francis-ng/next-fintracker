'use server'
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";

export async function submitLogin(formData: FormData) {
  const HASHVERSION = 2;

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const user = await users.findOne({UserName: username});
  if (!user) {
    return { message: 'Could not find user' };
  }
  if (user.Version < HASHVERSION) {
    redirect('/user/changepassword');
  }

  await client.close();

  if (await argon2.verify(user.Password, password)) {
    const accessToken = sign({user: username}, process.env.JWT_ACCESSKEY as string, {expiresIn: '1d'});
    const refreshToken = sign({user: username}, process.env.JWT_REFRESHKEY as string, {expiresIn: '365d'});

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
  else {
    return { message: 'Unauthorized' };
  }
};
