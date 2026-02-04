import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export interface JwtPayload {
  userId: number;
  email: string;
}

export interface TokenResult {
  token: string;
}

export function generateToken(payload: JwtPayload): TokenResult {
  const accessToken = jwt.sign(payload, JWT_SECRET);
  return { token: accessToken };
}

export function verifyToken(token: string): JwtPayload | null {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  return decoded;
}
