import DiscussionReply "../types/DiscussionReply";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
module {
    public func createDiscussionReply( replies : DiscussionReply.DiscussionReplies, replyId : Nat, newReply : DiscussionReply.DiscussionReply ) : Result.Result<DiscussionReply.DiscussionReply, Text> {
        if (replies.get(replyId) != null) {
            return #err("Reply with this ID already exists.");
        };

        let now = Time.now();
        let replyWithTimestamp : DiscussionReply.DiscussionReply = {
            id = replyId;
            discussionId = newReply.discussionId;  
            userId = newReply.userId;
            discussionContentReply = newReply.discussionContentReply;
            createdAt = now;
        };

        replies.put(replyId, replyWithTimestamp);
        #ok(replyWithTimestamp);
    };

    public func updateDiscussionReply( replies : DiscussionReply.DiscussionReplies, replyId : Nat, updatedReply : DiscussionReply.DiscussionReply ) : Result.Result<DiscussionReply.DiscussionReply, Text> {
        switch (replies.get(replyId)) {
            case (?_) {
                replies.put(replyId, updatedReply);
                #ok(updatedReply);
            };
            case (null) {
                #err("Reply not found, cannot update.");
            };
        };
    };

    public func deleteDiscussionReply( replies : DiscussionReply.DiscussionReplies, replyId : Nat ) : Result.Result<Text, Text> {
        switch (replies.get(replyId)) {
            case (?_) {
                let _ = replies.remove(replyId);
                #ok("Reply deleted successfully.");
            };
            case (null) {
                #err("Reply not found, cannot delete.");
            };
        };
    };

    public func getRepliesByDiscussionId( replies : DiscussionReply.DiscussionReplies, discussionId : Nat ) : [DiscussionReply.DiscussionReply] {
        Iter.toArray(
            Iter.filter<DiscussionReply.DiscussionReply>(
                replies.vals(),
                func(r) {
                    r.discussionId == discussionId
                }
            )
        )
    };
};