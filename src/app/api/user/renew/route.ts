import { verify, sign } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { FTPayload } from "@/types";


export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
    const data = req.body;

    try {
      const payload = verify(data.token, process.env.JWT_REFRESHKEY as string) as FTPayload;
      const user = await users.findOne({UserName: payload.user});
      if (!user) {
        return res.status(404).send('Username does not exist');
      }
      client.close();

      const accessToken = sign({user: payload.user}, process.env.JWT_ACCESSKEY as string, {expiresIn: '1d'});
      const refreshToken = sign({user: payload.user}, process.env.JWT_REFRESHKEY as string, {expiresIn: '365d'});

      return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    }
    catch (err) {
      return res.status(401).send('Token expired');
    }
  }
  else {
    return res.status(405).setHeader('Allow', 'POST').send(null);
  }
};