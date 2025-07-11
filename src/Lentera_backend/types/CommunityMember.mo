import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import User "User";
module {
    public type CommunityMember = {
        id : Nat;
        userId : User.User;
        isEntry : Bool;
    };
    
};