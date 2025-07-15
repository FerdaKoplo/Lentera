import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
module {
    public type DiscussionReplies = HashMap.HashMap<Nat, DiscussionReply>;
    public type  DiscussionReply = {
        id : Nat;
        discussionId : Nat;
        userId : Principal;
        discussionContentReply : Text;
        createdAt : Time.Time;
    };
    
};