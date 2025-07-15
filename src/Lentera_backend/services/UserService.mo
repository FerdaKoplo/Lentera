import User "../types/User";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
module {
      public func registerUser(users : User.Users, userId : Principal, username : Text) : Result.Result<User.User, Text> {
        if (Text.size(username) < 3) {
            return #err("Username must be at least 3 characters long");
        };
        if (Principal.isAnonymous(userId)) {
            return #err("Invalid principal");
        };
        for ((id, user) in users.entries()) {
            if (Text.equal(user.username, username) and id != userId) {
                return #err("USERNAME_TAKEN: The username '" # username # "' is already in use.");
            };
        };
        switch (users.get(userId)) {
            case (?existingUser) {
                #ok(existingUser);
            };
            case (null) {
                let newUser : User.User = {
                    id = userId;
                    username = username;
                    avatarUrl = null;
                    hasProfile = false;
                    createdAt = Time.now();
                };
                users.put(userId, newUser);
                #ok(newUser);
            };
        };
    };
    
    public func getUser(users: [User.User], id:Principal ) : ?User.User {
        return Array.find<User.User>(users, func(user: User.User) : Bool{
            user.id == id
        })
    };

    public func getCurrentUser(users: [User.User], caller:Principal) : ?User.User {
        return getUser(users, caller);
    };

    public func getUserByPrincipal(users : User.Users, principal : Principal) : ?User.User {
    return users.get(principal);
    };

    public func getUserByUsername(users : User.Users, username : Text) : ?User.User {
        for ((principal, user) in users.entries()) {
            if (user.username == username) {
                return ?user;
            };
        };
        return null;
    };
};