import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const HASHVERSION = 2;

  if (req.method === 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
    const data = req.body;

    const user = await users.findOne({UserName: data.UserName});
    if (user) {
      return res.status(409).send('Username already exists');
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

    return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  else {
    return res.status(405).setHeader('Allow', 'POST').send(null);
  }
};