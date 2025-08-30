import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import MentalStateTypes "../types/MentalState"; 
import Array "mo:base/Array";
import Iter "mo:base/Iter";

module {
  public type MentalState = MentalStateTypes.MentalState;

  public class MentalStateService() {
    private var mentalStates : HashMap.HashMap<Principal, [MentalState]> = HashMap.HashMap(0, Principal.equal, Principal.hash);

    public func saveMentalState(userId: Principal, state: MentalState): async Result.Result<Text, Text> {
      switch (mentalStates.get(userId)) {
        case (?states) {
          let updated = Array.append<MentalState>(states, [state]);
          mentalStates.put(userId, updated);
        };
        case null {
          mentalStates.put(userId, [state]);
        };
      };
      return #ok("Mental state saved");
    };


    public func getMentalStatesByUser(userId: Principal): [MentalState] {
      switch (mentalStates.get(userId)) {
        case (?states) states;
        case null [];
      }
    };
  };
};
