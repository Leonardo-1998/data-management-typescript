import { UnauthorizedException } from '@nestjs/common';
import { verifyToken, JwtPayload } from 'src/utils/jwt';

export function verifyAuthHeader(authHeader: string | undefined): JwtPayload {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Token not provided');
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    throw new UnauthorizedException('Token not provided');
  }

  return payload;
}
