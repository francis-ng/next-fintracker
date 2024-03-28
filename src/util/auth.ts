import { headers } from "next/headers";
import { verify } from "jsonwebtoken";
import { FTPayload } from "@/types";

export function authorize(req: Request) {
  const headerList = headers();
  let token = headerList.get('authorization') ?? '';
  token = token.replace('Bearer ', '');
  if (token == '') {
    return null;
  }
  else {
    try {
      const payload = verify(token, process.env.JWT_REFRESHKEY as string) as FTPayload;
      return payload.user;
    }
    catch (err) {
      return null;
    }
  }
}