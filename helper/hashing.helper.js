import bcryptjs from 'bcryptjs';

export function hash(password) {
  return bcryptjs.hashSync(password, 10);
}
