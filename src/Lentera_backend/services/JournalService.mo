import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import JournalTypes "../types/Journal";
import Nat32 "mo:base/Nat32";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import LLM "mo:llm";
import Chat "mo:llm/chat";
import Json "mo:json";
import MentalState "../types/MentalState";
import JsonUtils "../utils/JsonUtils";

import LabelResult "../types/LabelResult";

module {
  public type Journal = JournalTypes.Journal;
  public type Journals = JournalTypes.Journals;

  public class JournalService() {
    private var journalMap : Journals = HashMap.HashMap<Principal, [Journal]>(0, Principal.equal, Principal.hash);
    private var journalCounter : Nat = 0;

    func generateJournalId(userId: Principal): Text {
      let now: Int = Time.now();
      let hashInt: Int = Nat32.toNat(Principal.hash(userId));
      let rawId: Int = now + hashInt;
      return Int.toText(rawId); // atau encode base64 kalau ingin lebih acak
    };

    public func getAll() : [Journal] {
      let all = Iter.toArray(journalMap.vals());
      return Array.flatten<Journal>(all);
    };

    public func getByUser(userId : Principal) : ?[Journal] {
      return journalMap.get(userId);
    };

    public func createJournal(
      userId : Principal,
      note : Text,
      mood : Text,
      emotions : ?[Text],
      emotionTrigger : ?[Text],
      timestamp : Time.Time
    ) : Result.Result<Journal, Text> {
      let newId = generateJournalId(userId);

      let newJournal : Journal = {
        id = newId;
        userId = userId;
        note = note;
        mood = mood;
        emotions = emotions;
        emotionTrigger = emotionTrigger;
        timeCreated = timestamp;
        dateCreated = timestamp;
      };
      let existing = switch (journalMap.get(userId)) {
        case (?list) list;
        case (_) [];
      };

      let updated = Array.append<Journal>(existing, [newJournal]);
      journalMap.put(userId, updated);
      journalCounter += 1;

      return #ok(newJournal);
    };

    public func analyzeJournalLLM(journal: Journal): async MentalState.MentalState {
        let prompt = 
          "Berikut ini adalah catatan harian pengguna.\n\n" #
          "Mood: " # journal.mood # "\n" #
          "Note: " # journal.note # "\n\n" #
          "Analisis kondisi mental pengguna dan berikan label sesuai kategori berikut:\n" #
          "1. Kondisi Kesehatan Mental Utama (wajib): anxiety, depression, burnout, ptsd, panic, insomnia, low_self_esteem, intrusive_thoughts\n" #
          "2. Status Emosional/Gejala (opsional): rumination, irritability, hopelessness, worthlessness, emotional_numbness, detachment\n" #
          "3. Status Mental Positif (opsional): happy, grateful, hopeful, calm, resilient, self_reflection, seeking_help, grounded, motivated, connected, self_acceptance\n\n" #
          "Aturan:\n" #
          "- Pilih 1-3 label utama dari kategori 1 (wajib)\n" #
          "- Tambahkan label dari kategori 2/3 jika relevan (maksimal 5 label total)\n" #
          "- Berikan confidence score untuk setiap label\n" #
          "- Urutkan dari confidence tertinggi ke terendah\n\n" #
          "Format jawaban wajib JSON:\n" #
          "{\n" #
          "  \"journalId\": \"" # journal.id # "\",\n" #
          "  \"userId\": \"" # Principal.toText(journal.userId) # "\",\n" #
          "  \"labelEmotion\": [\"depression\", \"anxiety\", \"hopelessness\"],\n" #
          "  \"confidence\": [[\"depression\", 0.85], [\"anxiety\", 0.78], [\"hopelessness\", 0.65]]\n" #
          "}";
        
        try {
            let result = await LLM.prompt(#Llama3_1_8B, prompt);
            
            // Parse the response
            switch (JsonUtils.fromJson(result)) {
                case (#ok(mentalState)) {
                    // Add journal metadata to the parsed result
                    {
                        journalId = journal.id;
                        userId = journal.userId;
                        labelEmotion = mentalState.labelEmotion;
                        confidence = mentalState.confidence;
                    }
                };
                case (#err(e)) {
                    Debug.print("JSON parsing error: " # e);
                    return defaultMentalState(journal);
                };
            };
        } catch(e) {
            Debug.print("LLM call failed: " # Error.message(e));
            return defaultMentalState(journal);
        }
    };
    
    // Helper to create a default MentalState
    func defaultMentalState(journal: Journal): MentalState.MentalState {
        let emptyResult: LabelResult.LabelResult = {
            labelEmotion = [];
            confidence = [];
        };
        
        {
            journalId = journal.id;
            userId = journal.userId;
            labelEmotion = emptyResult;
            confidence = emptyResult;
        }
    };

  };

   
  
};