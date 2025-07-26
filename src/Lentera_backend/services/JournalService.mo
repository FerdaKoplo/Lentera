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
import MentalState "../types/MentalState";

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

    public func analyzeJournalLLM(journal: Journal): async Text {
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
            "Format jawaban wajib JSON. Jangan tambahkan penjelasan di luar JSON.\n\n" #
            "{\n" #
            "  \"journalId\": \"" # journal.id # "\",\n" #
            "  \"userId\": \"" # Principal.toText(journal.userId) # "\",\n" #
            "  \"labelEmotion\": [\"depression\", \"anxiety\", \"hopelessness\"],\n" #
            "  \"confidence\": [[\"depression\", 0.85], [\"anxiety\", 0.78], [\"hopelessness\", 0.65]]\n" #
            "}";

        let result = await LLM.prompt(#Llama3_1_8B, prompt);
        return result;  
    }

  };

   
  
};