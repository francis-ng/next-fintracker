import { Ledger } from "@/types";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "../user/login/route";

async function addLedger(data: Ledger, user: string, res: NextApiResponse) {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

  data.Owner = user;
  data.UpdatedAt = new Date();

  const result = await ledgers.insertOne(data);

  client.close();
  return res.status(200).json(result);
}

async function updateLedger(data: Ledger, user: string, res: NextApiResponse) {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

  const ledger = ledgers.findOne({_id: data._id});
  if (!ledger) {
    return res.status(404).send(null);
  }

  data.UpdatedAt = new Date();
  const result = await ledgers.updateOne(
    {_id: data._id},
    { ...data }
  );

  client.close();
  return res.status(200).json(result);
}

async function deleteLedger(data: Ledger, user: string, res: NextApiResponse) {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

  const ledger = ledgers.findOne({_id: data._id});
  if (!ledger) {
    return res.status(404).send(null);
  }

  await ledgers.deleteOne(data);

  client.close();
  return res.status(200).send(null);
}

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const user = authorize(req);
  if (!user) {
    return res.status(401).send(null);
  }

  if (req.method === 'POST') {
    await addLedger(req.body, user, res);
  }
  else if (req.method === 'PUT') {
    await updateLedger(req.body, user, res);
  }
  else if (req.method === 'DELETE') {
    await deleteLedger(req.body, user, res);
  }
  else {
    return res.status(405).setHeader('Allow', 'POST,PUT,DELETE').send(null);
  }
};