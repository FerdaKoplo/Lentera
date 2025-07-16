import { useEffect, useState } from "react";
import { Lentera_backend } from "../../../declarations/Lentera_backend";
import type { Journal } from "../../../declarations/Lentera_backend/Lentera_backend.did";
import { useProfile } from "./useProfile"; // pastikan path ini sesuai

const useJournal = () => {
  const [myJournals, setMyJournals] = useState<Journal[]>([]);
  const [allJournals, setAllJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { profile } = useProfile();

  // Fetch journal milik user
  const fetchMyJournals = async () => {
    try {
      setLoading(true);
      const result = await Lentera_backend.getMyJournal();
      const journals = result.length === 1 ? result[0] : [];
      setMyJournals(journals);
    } catch (error) {
      setError("Failed to fetch your journal");
    } finally {
      setLoading(false);
    }
  };

  // Create journal
  const createJournal = async (
    note: string,
    mood: string,
    emotions?: string[],
    emotionTrigger?: string[]
  ) => {
    try {
      setLoading(true);
      const result = await Lentera_backend.createJournal(
        note,
        mood,
        emotions ? [emotions] : [],
        emotionTrigger ? [emotionTrigger] : []
      );
      if ("ok" in result) {
        setMyJournals((prev) => [result.ok, ...prev]);
        return result.ok;
      } else {
        setError(result.err);
        return null;
      }
    } catch (error) {
      setError("Failed to create journal");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    myJournals,
    allJournals,
    loading,
    error,
    fetchMyJournals,
    createJournal,
  };
};

export default useJournal;
