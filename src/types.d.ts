import { ObjectId } from "mongodb";
import { JwtPayload } from "jsonwebtoken";

interface Item {
  Label: string,
  Amount: number
}

interface Ledger {
  _id: ObjectId,
  Owner: string,
  Type: string,
  Month: number,
  Year: number,
  UpdatedAt: Date,
  Debits: Item[],
  Credits: Item[]
}

interface FTPayload extends JwtPayload {
  user: string
}