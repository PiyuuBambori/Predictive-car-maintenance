import db from '../db';

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  last_login: string;
}

export const UserModel = {
  findByEmail: (email: string) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  },

  updateLastLogin: (userId: number) => {
    const stmt = db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(userId);
  }
};