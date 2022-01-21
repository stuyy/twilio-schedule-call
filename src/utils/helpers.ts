import * as bcrypt from 'bcrypt';

export const hashText = async (raw: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(raw, salt);
};

export const compareHash = async (raw: string, hash: string) =>
  bcrypt.compare(raw, hash);
