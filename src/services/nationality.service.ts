import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../db/db";
import Nationality from "../interfaces/nationality.interface";

const nationalityService = {
  getAllNationalities: async (): Promise<Nationality[]> => {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM Nationalities"
    );
    return rows as Nationality[];
  },

  getNationalityById: async (id: number): Promise<Nationality | null> => {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM Nationalities WHERE nationality_id = ?",
      [id]
    );
    const nationalities = rows as Nationality[];
    return nationalities.length > 0 ? nationalities[0] : null;
  },

  createNationality: async (country_name: string): Promise<number> => {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO Nationalities (country_name) VALUES (?)",
      [country_name]
    );
    return result.insertId;
  },

  updateNationality: async (
    id: number,
    country_name: string
  ): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(
      "UPDATE Nationalities SET country_name = ? WHERE nationality_id = ?",
      [country_name, id]
    );
    return result.affectedRows > 0;
  },

  deleteNationality: async (id: number): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM Nationalities WHERE nationality_id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

export default nationalityService;
