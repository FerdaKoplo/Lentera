import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import User "User";
module {
    public type CommunityMember = {
        id : Nat;
        userId : Principal;
        isEntry : Bool;
    };
    
};