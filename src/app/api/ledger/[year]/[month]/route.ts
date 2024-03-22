import { MongoClient } from "mongodb";
import { authorize } from "../../../../../util/auth";

export async function GET(req: Request) {
  const user = authorize(req);
  if (!user) {
    return new Response(null, {status:401});
  }

  const { searchParams } = new URL(req.url)
  const yearQ = searchParams.get('year') as string;
  const monthQ = searchParams.get('month') as string;
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
    return new Response(null, {status:404});
  }

  return Response.json(ledger);
};