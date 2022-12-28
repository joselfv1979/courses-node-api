import { sign, SignOptions } from "jsonwebtoken";

export interface Payload {
  id: string;
  username: string;
  role: string;
}

/**
 * generates JWT used for local testing
 */
export function generateToken(id: string, username: string, role: string) {
  // information to be encoded in the JWT
  const payload: Payload = {
    username,
    id,
    role
  };
  // read private key value
  const privateKey = process.env.SECRET as string;

  const signInOptions: SignOptions = {
    expiresIn: "24h"
  };

  // generate JWT
  return sign(payload, privateKey, signInOptions);
}