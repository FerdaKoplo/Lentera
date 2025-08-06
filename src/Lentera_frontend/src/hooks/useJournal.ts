import { useEffect, useState } from "react";
import { Lentera_backend } from "../../../declarations/Lentera_backend";
import type {
  Journal,
} from "../../../declarations/Lentera_backend/Lentera_backend.did";

type ParsedMentalState = {
  journalId: string;
  userId: string;
  labelEmotion: string[];
  confidence: [string, number][];
};


const useJournal = () => {
  const [myJournals, setMyJournals] = useState<Journal[]>([]);
  const [allJournals, setAllJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mentalState, setMentalState] = useState<ParsedMentalState | null>(null)
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [errorAnalysis, setErrorAnalysis] = useState<string | null>(null);

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
    timestamp: bigint,
    emotions?: string[],
    emotionTrigger?: string[]
  ) => {
    try {
      setLoading(true);
      const result = await Lentera_backend.createJournal(
        note,
        mood,
        emotions ? [emotions] : [],
        emotionTrigger ? [emotionTrigger] : [],
        timestamp
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

  const analyze = async (journal : Journal) => {
    try {
      setLoadingAnalysis(true);
      setErrorAnalysis(null);

      const rawResult = await Lentera_backend.analyzeJournal(journal);

      let parsedResult = null;
      try {
        parsedResult = JSON.parse(rawResult) 
      } catch (err) {
        console.error("Failed to parse LLM result:", rawResult);
        setErrorAnalysis("LLM response invalid format.");
        return null;
      }

      if (!parsedResult.labelEmotion || !parsedResult.confidence) {
        console.error("Invalid LLM response structure:", parsedResult);
        setErrorAnalysis("Incomplete data from LLM.");
        return null;
      }

      setMentalState(parsedResult);
      return parsedResult;
    } catch (err) {
      console.error("Failed to analyze journal:", err);
      setErrorAnalysis("Failed to analyze journal.");
      return null;
    } finally {
      setLoadingAnalysis(false);
    }
  }

  


  return {
    myJournals,
    allJournals,
    loading,
    error,
    fetchMyJournals,
    createJournal,
    mentalState,
    loadingAnalysis,
    errorAnalysis,
    analyze,
  };
};

export default useJournal;
