import User "types/User";
import UserService "services/UserService";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

actor {
  stable var stableUser : [User.User] = [];
  var userMap : User.Users = HashMap.HashMap(0, Principal.equal, Principal.hash);

  system func preupgrade() {
    stableUser := Iter.toArray(userMap.vals());
  };

  system func postupgrade() {
    for (user in stableUser.vals()) {
      userMap.put(user.id, user);
    };
    stableUser := [];
  };

  // Fungsi user
  public shared(msg) func registerUser(username : Text) : async Result.Result<User.User, Text> {
    let caller = msg.caller;
    let result = UserService.registerUser(userMap, caller, username);
    switch (result) {
      case (#ok(user)) return #ok(user);
      case (#err(e)) return #err(e);
    }
  };
  public shared query func getUserByPrincipal(p : Principal) : async Result.Result<User.User, Text> {
    switch (userMap.get(p)) {
      case (?user) return #ok(user);
      case null return #err("User not found");
    }
  };
  public shared(msg) func getCurrentUser() : async ?User.User {
    let caller = msg.caller;
    return UserService.getCurrentUser(Iter.toArray(userMap.vals()), caller);
  };
  public query func getUserByUsername(username : Text) : async ?User.User {
    return UserService.getUserByUsername(userMap, username);
  };
};
