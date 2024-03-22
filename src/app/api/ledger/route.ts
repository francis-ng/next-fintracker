import { MongoClient } from "mongodb";
import { authorize } from "../../../util/auth";

// ADD
export async function POST(req: Request) {
  const user = authorize(req);
  if (!user) {
    return new Response(null, {status: 401});
  }
  const data = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

  data.Owner = user;
  data.UpdatedAt = new Date();

  const result = await ledgers.insertOne(data);

  client.close();
  return Response.json(result);
}

// UPDATE
export async function PUT(req: Request) {
  const user = authorize(req);
  if (!user) {
    return new Response(null, {status: 401});
  }
  const data = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

  const ledger = ledgers.findOne({_id: data._id});
  if (!ledger) {
    return new Response(null, {status: 404});
  }

  data.UpdatedAt = new Date();
  const result = await ledgers.updateOne(
    {_id: data._id},
    { ...data }
  );

  client.close();
  return Response.json(result);
}

export async function DELETE(req: Request) {
  const user = authorize(req);
  if (!user) {
    return new Response(null, {status: 401});
  }
  const data = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

  const ledger = ledgers.findOne({_id: data._id});
  if (!ledger) {
    return new Response(null, {status: 404});
  }

  await ledgers.deleteOne(data);

  client.close();
  return new Response(null);
}
