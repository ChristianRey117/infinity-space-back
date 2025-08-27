import { ResultSetHeader, RowDataPacket } from "mysql2";
import Score from "../interfaces/score.interface";
import db from "../db/db";

const scoreService = {
  getAllScores: async (): Promise<Score[]> => {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT 
        score.points,
        score.created_at,
        users.username,
        nationalities.flag
      FROM score
      JOIN users ON score.user_id = users.id
      JOIN nationalities ON users.nationality_id = nationalities.id
      ORDER BY score.points DESC
        `);
    return rows as Score[];
  },

  getScoreById: async (id: number): Promise<Score | null> => {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM score WHERE score_id = ?",
      [id]
    );
    const scores = rows as Score[];
    return scores.length > 0 ? scores[0] : null;
  },

  createScore: async (user_id: number, points: number): Promise<number> => {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO score (user_id, points) VALUES (?, ?)",
      [user_id, points]
    );
    return result.insertId;
  },

  updateScore: async (
    id: number,
    user_id: number,
    points: number
  ): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(
      "UPDATE score SET user_id = ?, points = ? WHERE score_id = ?",
      [user_id, points, id]
    );
    return result.affectedRows > 0;
  },

  deleteScore: async (id: number): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM score WHERE score_id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

export default scoreService;
