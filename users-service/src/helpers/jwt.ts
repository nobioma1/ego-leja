import jwt from 'jsonwebtoken';

export class JWT {
  static generate(payload: object): string {
    return jwt.sign(payload, process.env.JWT_KEY!);
  }

  static verify(jwtValue: string) {
    return jwt.verify(jwtValue, process.env.JWT_KEY!);
  }
}
