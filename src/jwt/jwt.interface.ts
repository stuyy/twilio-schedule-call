export interface TokenGenerator {
  generateJwt(payload: string | object | Buffer): string;
  verifyJwt(token: string);
}
