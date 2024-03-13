import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "../../../user/login/route";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authorize(req);
  if (!user) {
    return res.status(401).send(null);
  }

  if (req.method == 'GET') {
    let { yearQ, monthQ } = req.query;
    const year = parseInt(yearQ as string);
    const month = parseInt(monthQ as string);
    const client = new MongoClient(process.env.MONGODB_URI as string);
    const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

    let type = 'regular';
    if (year == 0 && month == 0) {
      type = 'fixed';
    }

    const ledger = ledgers.findOne({
      Year: year,
      Month: month,
      Type: type,
      Owner: user
    });

    client.close();

    if (!ledger) {
      return res.status(404).send(null);
    }

    return res.status(200).json(ledger);
  }
  else {
    return res.status(405).setHeader('Allow', 'GET').send(null);
  }
};