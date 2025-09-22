import * as SQLite from "expo-sqlite";

export type Word = {
  id: number;
  word: string;
  meaning: string;
  favorite?: boolean;
  selfcreated: boolean;
};

class DatabaseService {
  private static instance: DatabaseService;
  private db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!this.instance) {
      this.instance = new DatabaseService();
    }

    return this.instance;
  }

  public setDatabase(database: SQLite.SQLiteDatabase) {
    this.db = database;
  }

  private getDatabase(): SQLite.SQLiteDatabase {
    if (!this.db) {
      throw new Error("Database not initialized. Call setDatabase() first.");
    }
    return this.db;
  }

  async getWords(): Promise<Array<Word>> {
    try {
      const result = await this.getDatabase().getAllAsync<Word>(`
          SELECT id, word, meaning, selfcreated 
          FROM words
          ORDER BY word ASC
        `);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insertWord(
    word: string,
    meaning: string,
    favorite?: boolean
  ): Promise<number> {
    try {
      // await this.db!.withTransactionAsync(async () => {
      // });

      const result = await this.getDatabase().runAsync(
        `INSERT INTO words (word, meaning, selfcreated) 
       VALUES (?, ?, ?)`,
        [word, meaning, 1]
      );

      if (favorite) {
        await this.getDatabase().runAsync(
          `INSERT INTO favorites (word_id) VALUES (?)`,
          [result?.lastInsertRowId]
        );
      }

      return result?.lastInsertRowId!;
    } catch (error) {
      throw error;
    }
  }

  async getFavorites() {
    try {
      const result = await this.getDatabase().getAllAsync<
        Word & { favoriteId: number }
      >(
        `SELECT w.id, w.word, w.meaning, w.selfcreated f.id as favoriteId FROM words w JOIN favorites f ON w.id = f.word_id`
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insertFavorite(word_id: number) {
    try {
      const result = await this.getDatabase().runAsync(
        ` INSERT INTO favorites (word_id) VALUES (?)`,
        [word_id]
      );
      return result.lastInsertRowId;
    } catch (error) {
      throw error;
    }
  }

  async removeFavorite(id: number) {
    try {
      const result = await this.getDatabase().runAsync(
        `DELETE FROM favorites WHERE id = ?`,
        [id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async clearFavorites() {
    try {
      const result = await this.getDatabase().runAsync(`DELETE FROM favorites`);
      return result;
    } catch (error) {
      throw Error;
    }
  }

  async getHistory() {
    try {
      const result = await this.getDatabase().getAllAsync(
        `SELECT w.id, w.word, w.meaning, w.selfcreated FROM words w JOIN history h ON w.id = h.word-id`
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async clearHistory() {
    try {
      const result = await this.getDatabase().getAllAsync(
        `DELETE FROM history`
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export const databaseService = DatabaseService.getInstance();
