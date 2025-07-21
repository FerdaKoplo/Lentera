import Discussion "../types/Discussion";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Array "mo:base/Array";
module {
    public func getAllDiscussion(discussions  : Discussion.Discussions) : [Discussion.Discussion] {
        Iter.toArray(discussions.vals());
    };

    public func getDetailDiscussion(discussion : Discussion.Discussions, discussionId : Nat) : ?Discussion.Discussion {
        discussion.get(discussionId);
    };

    public func getDiscussionByUser(discussions : Discussion.Discussions, authorId : Principal) : [Discussion.Discussion] {
        Iter.toArray(
            Iter.filter<Discussion.Discussion>(
                discussions.vals(),
                func(c) {
                     c.authorDiscussion == authorId
                }
            )
        )
    };

    public func getDiscussionsByCommunity( discussions : Discussion.Discussions, communityId : Nat ) : [Discussion.Discussion] {
    let allDiscussions = Iter.toArray(discussions.vals()); 
    Array.filter<Discussion.Discussion>(
        allDiscussions,
        func(d : Discussion.Discussion) : Bool {
            d.communityId == communityId
        }
    )
};
    
    public func createDiscussion(discussions : Discussion.Discussions, discussionId : Nat, communityId : Nat, newDiscussion : Discussion.Discussion) : Result.Result<Discussion.Discussion, Text> {
        if (discussions.get(discussionId) != null) {
            return #err("Discussion with this ID already exists.");
        };

        let now = Time.now();
        let discussionWithTimestamp : Discussion.Discussion = {
            id = discussionId;
            communityId = communityId;
            authorDiscussion = newDiscussion.authorDiscussion;
            discussionTitle = newDiscussion.discussionTitle;
            discussionContent = newDiscussion.discussionContent;
            discussionReplyId = newDiscussion.discussionReplyId;
            createdAt = now;
        };
        discussions.put(discussionId, discussionWithTimestamp);
        #ok(discussionWithTimestamp);
    };

    public func updateDiscussion(discussions : Discussion.Discussions, discussionId : Nat, updatedDiscussion : Discussion.Discussion) : Result.Result<Discussion.Discussion, Text> {
        switch (discussions.get(discussionId)) {
            case (?_) {
                discussions.put(discussionId, updatedDiscussion);
                #ok(updatedDiscussion);
            };
            case (null) {
                #err("Discussion for this owner not found, cannot update.");
            };
        };
    };

    public func deleteDiscussion(discussions : Discussion.Discussions, discussionId : Nat) : Result.Result<Text, Text> {
        switch (discussions.get(discussionId)) {
            case (?_) {
                let _ = discussions.remove(discussionId);
                #ok("Discussion deleted successfully.");
            };
            case (null) {
                #err("Discussion for this owner not found, cannot delete.");
            };
        };
    };

};