import { connection } from "next/server";
import FintrackNav from "./FintrackNav";
import { auth } from "../auth";

export default async function Header() {
  await connection();
  const session = auth.api.getSession();

  return (
    <FintrackNav session={session} />
  )
}
