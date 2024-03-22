import { verify, sign } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { FTPayload } from "@/types";


export async function POST(req : Request) {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
  const data = await req.json();

  try {
    const payload = verify(data.token, process.env.JWT_REFRESHKEY as string) as FTPayload;
    const user = await users.findOne({UserName: payload.user});
    if (!user) {
      return new Response('Username does not exist', {status:404});
    }
    client.close();

    const accessToken = sign({user: payload.user}, process.env.JWT_ACCESSKEY as string, {expiresIn: '1d'});
    const refreshToken = sign({user: payload.user}, process.env.JWT_REFRESHKEY as string, {expiresIn: '365d'});

    return Response.json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  catch (err) {
    return new Response('Token expired', {status:401});
  }
};