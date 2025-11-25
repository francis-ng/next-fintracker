import FintrackNav from "./FintrackNav";
import { auth } from "../auth";

export default async function Header() {
  const session = auth.api.getSession();

  return (
    <FintrackNav session={session} />
  )
}
