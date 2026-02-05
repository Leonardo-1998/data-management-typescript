import { verifyToken, JwtPayload } from 'src/utils/jwt';
import { throwUnauthorized } from 'src/common';

export function verifyAuthHeader(authHeader: string | undefined): JwtPayload {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throwUnauthorized('Token not provided');
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    throwUnauthorized('Invalid token');
  }

  return payload;
}