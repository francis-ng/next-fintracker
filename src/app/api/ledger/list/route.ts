import { MongoClient } from "mongodb";
import { authorize } from "../../../../util/auth";

export async function GET(req : Request) {
  const user = authorize(req);
  if (!user) {
    return new Response(null, {status:401});
  }

  const client = new MongoClient(process.env.MONGODB_URI as string);
  const ledgers = client.db(process.env.MONGO_DB).collection(process.env.LEDGER_COLLECTION as string);

  const userLedgers = ledgers.find({
    Owner: user
  });

  client.close();

  return Response.json(userLedgers);
};