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
      emotionTrigger : ?[Text]
    ) : Result.Result<Journal, Text> {
      let now = Time.now();
      let newId = generateJournalId(userId);

      let newJournal : Journal = {
        id = newId;
        userId = userId;
        note = note;
        mood = mood;
        emotions = emotions;
        emotionTrigger = emotionTrigger;
        timeCreated = now;
        dateCreated = now; 
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
  }
};