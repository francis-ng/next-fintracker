import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { FTPayload } from "@/types";

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const HASHVERSION = 2;

  if (req.method === 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
    const data = req.body;

    const user = await users.findOne({UserName: data.UserName});
    if (!user) {
      return res.status(401).send(null);
    }
    if (user.Version < HASHVERSION) {
      return res.redirect('/user/changepassword');
    }

    await client.close();

    if (await argon2.verify(user.Password, data.Password)) {
      const accessToken = sign({user: data.UserName}, process.env.JWT_ACCESSKEY as string, {expiresIn: '1d'});
      const refreshToken = sign({user: data.UserName}, process.env.JWT_REFRESHKEY as string, {expiresIn: '365d'});

      return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    }
    else {
      return res.status(403).send(null);
    }

  }
  else {
    return res.status(405).setHeader('Allow', 'POST').send(null);
  }
};

export function authorize(req: NextApiRequest) {
  let token = req.headers.authorization ?? '';
  token = token.replace('Bearer ', '');
  if (token == '') {
    return null;
  }
  else {
    try {
      const payload = verify(token, process.env.JWT_REFRESHKEY as string) as FTPayload;
      return payload.user;
    }
    catch (err) {
      return null;
    }
  }
}