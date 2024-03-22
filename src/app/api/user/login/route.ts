import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";


export async function POST(req : Request) {
  const HASHVERSION = 2;

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const users = client.db(process.env.MONGO_DB).collection(process.env.USER_COLLECTION as string);
  const data = await req.json();

  const user = await users.findOne({UserName: data.UserName});
  if (!user) {
    return new Response(null, {status:401});
  }
  if (user.Version < HASHVERSION) {
    return redirect('/user/changepassword');
  }

  await client.close();

  if (await argon2.verify(user.Password, data.Password)) {
    const accessToken = sign({user: data.UserName}, process.env.JWT_ACCESSKEY as string, {expiresIn: '1d'});
    const refreshToken = sign({user: data.UserName}, process.env.JWT_REFRESHKEY as string, {expiresIn: '365d'});

    return Response.json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  else {
    return new Response(null, {status:403});
  }
};
