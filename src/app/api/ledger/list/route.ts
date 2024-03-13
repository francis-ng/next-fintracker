import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "../../user/login/route";

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const user = authorize(req);
  if (!user) {
    return res.status(401).send(null);
  }

  if (req.method === 'GET') {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

    const userLedgers = ledgers.find({
      Owner: user
    });

    client.close();

    return res.status(200).json(userLedgers);
  }
  else {
    return res.status(405).setHeader('Allow', 'GET').send(null);
  }
};