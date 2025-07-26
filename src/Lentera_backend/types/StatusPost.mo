import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
module {
    public type StatusPosts = HashMap.HashMap<Nat, StatusPost>;
    public type StatusPost = {
        id : Nat;
        postAuthor : Principal;
        statusContent : Text;
        statusLike : Nat;
        likedBy : [Principal];
        createdAt : Time.Time;
    };
};