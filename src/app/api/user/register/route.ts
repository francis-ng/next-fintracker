import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { MongoClient } from "mongodb";

export async function POST(req : Request) {
  const HASHVERSION = 2;

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
  const data = await req.json();

  const user = await users.findOne({UserName: data.UserName});
  if (user) {
    return new Response('Username already exists', {status:409});
  }

  const hash = await argon2.hash(data.Password);
  const accessToken = sign({user: data.UserName}, process.env.JWT_ACCESSKEY as string, {expiresIn: '1d'});
  const refreshToken = sign({user: data.UserName}, process.env.JWT_REFRESHKEY as string, {expiresIn: '365d'});

  await users.insertOne({
    UserName: data.UserName,
    Password: hash,
    Version: HASHVERSION
  });

  await client.close();

  return Response.json({ accessToken: accessToken, refreshToken: refreshToken });
};