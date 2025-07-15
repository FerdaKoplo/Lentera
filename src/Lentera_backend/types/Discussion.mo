import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Community "Community";
module {
    public type Discussions = HashMap.HashMap<Nat, Discussion>;
    public type Discussion = {
        id : Nat;
        communityId : Nat;
        authorDiscussion : Principal;
        discussionTitle : Text;
        discussionContent : Text;
        discussionReplyId : [Nat];
        createdAt : Time.Time;
    };
    
};