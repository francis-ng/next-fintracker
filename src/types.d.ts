import { ObjectId } from "mongodb";
import { JwtPayload } from "jsonwebtoken";

interface LedgerItem {
  Label: string,
  Amount: number
}

interface Ledger {
  _id?: ObjectId,
  Owner: string,
  Type: string,
  Month: number,
  Year: number,
  UpdatedAt: Date,
  Debits: LedgerItem[],
  Credits: LedgerItem[]
}

interface FTPayload extends JwtPayload {
  user: string
}