import { useEffect, useState } from "react";
import { Lentera_backend } from "../../../declarations/Lentera_backend";
import type { Journal } from "../../../declarations/Lentera_backend/Lentera_backend.did";
import { AuthClient } from "@dfinity/auth-client";
import { useAuth } from "../context/auth-context";
import { Principal } from "@dfinity/principal";

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
  const [mentalStates, setMentalStates] = useState<ParsedMentalState[]>([]);
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

  const analyze = async (journal: Journal) => {
    try {
      setLoadingAnalysis(true);
      setErrorAnalysis(null);

      const rawResult = await Lentera_backend.analyzeJournal(journal);
      const parsedResult = JSON.parse(rawResult);

      setMentalStates(parsedResult);

      return parsedResult;
    } catch (error) {
      setErrorAnalysis("Failed to analyze journal.");
      console.error(error);
      return null;
    } finally {
      setLoadingAnalysis(false);
    }
  };


  // const saveMentalState = async (mentalState: ParsedMentalState) => {
  //   try {
  //     const result = await Lentera_backend.saveMentalState({
  //       journalId: mentalState.journalId,
  //       labelEmotion: mentalState.labelEmotion,
  //       confidence: mentalState.confidence,
  //     });
  //     return result;
  //   } catch (error) {
  //     console.error("Failed to save mental state:", error);
  //     throw error;
  //   }
  // };


  const fetchMyMentalStates = async () => {
    try {
      const result = await Lentera_backend.getMyMentalStates();
      console.log("My mental states:", result);
      const parsed: ParsedMentalState[] = result.map((state) => ({
        journalId: state.journalId,
        userId: state.userId.toText(),
        labelEmotion: state.labelEmotion,
        confidence: state.confidence,
      }));

      setMentalStates(parsed);
    } catch (err) {
      console.error("Failed to fetch mental states", err);
    }
  };

  return {
    myJournals,
    allJournals,
    loading,
    error,
    fetchMyJournals,
    createJournal,
    mentalStates,
    loadingAnalysis,
    errorAnalysis,
    analyze,
    fetchMyMentalStates,
    // saveMentalState
  };
};

export default useJournal;
