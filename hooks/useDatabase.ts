import { databaseService } from "../services/DatabaseService";
import { useSQLiteContext } from "expo-sqlite";
import { WordProps } from "@components/Word";
import { ToastAndroid } from "react-native";
import React, { useEffect } from "react";

export const useDatabase = () => {
  const db = useSQLiteContext();

  useEffect(() => {
    const initDb = async () => {
      try {
        databaseService.setDatabase(db);
      } catch (error) {
        throw new Error("Failed to initialize database service:\n" + error);
      }
    };

    initDb();
  }, [db]);

  async function getWords(): Promise<Array<WordProps>> {
    try {
      return await databaseService.getWords();
    } catch (error) {
      ToastAndroid.show("Error fetching words", ToastAndroid.LONG);
      throw new Error("Error getting words:\n" + error);
    }
  }

  async function saveWord(word: string, meaning: string, favorite?: boolean) {
    try {
      return await databaseService.insertWord(word, meaning, favorite);
    } catch (error) {
      ToastAndroid.show("Error saving word", ToastAndroid.LONG);
      throw new Error("Error saving word:\n" + error);
    }
  }

  async function getFavorites() {
    try {
      return await databaseService.getFavorites();
    } catch (error) {
      ToastAndroid.show("Error getting favorites", ToastAndroid.LONG);
      throw new Error("Error getting favorites:\n" + error);
    }
  }

  async function saveFavorite(id: number) {
    try {
      return await databaseService.insertFavorite(id);
    } catch (error) {
      ToastAndroid.show("Error saving favorite", ToastAndroid.LONG);
      throw new Error("Error saving favorite:\n" + error);
    }
  }

  async function deleteFavorite(id: number) {
    try {
      return await databaseService.removeFavorite(id);
    } catch (error) {
      ToastAndroid.show("Error deleting favorite", ToastAndroid.LONG);
      throw new Error("Error deleting favorite:\n" + error);
    }
  }

  async function clearFavorites() {
    try {
      return await databaseService.clearFavorites();
    } catch (error) {
      ToastAndroid.show("Error clearing favorites", ToastAndroid.LONG);
      throw new Error("Error clearing favorites:\n" + error);
    }
  }

  async function getHistory() {
    try {
      return await databaseService.getHistory();
    } catch (error) {
      ToastAndroid.show("Error getting history", ToastAndroid.LONG);
      throw new Error("Error getting history:\n" + error);
    }
  }

  async function clearHistory() {
    try {
      return await databaseService.clearHistory();
    } catch (error) {
      ToastAndroid.show("Error clearing history", ToastAndroid.LONG);
      throw new Error("Error clearing history:\n" + error);
    }
  }

  return {
    saveWord,
    getWords,
    getFavorites,
    saveFavorite,
    deleteFavorite,
    clearFavorites,
    getHistory,
    clearHistory,
  };
};
