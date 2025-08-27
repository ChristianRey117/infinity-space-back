import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../db/db";
import User from "../interfaces/user.interface";

const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM Users");
    return rows as User[];
  },

  getUserById: async (id: number): Promise<User | null> => {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM Users WHERE user_id = ?",
      [id]
    );
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  },

  createUser: async (
    username: string,
    nationality_id: number
  ): Promise<number> => {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO Users (username, nationality_id) VALUES (?, ?)",
      [username, nationality_id]
    );
    return result.insertId;
  },

  updateUser: async (
    id: number,
    username: string,
    nationality_id: number
  ): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(
      "UPDATE Users SET username = ?, nationality_id = ? WHERE user_id = ?",
      [username, nationality_id, id]
    );
    return result.affectedRows > 0;
  },

  deleteUser: async (id: number): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM Users WHERE user_id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

export default userService;
