import StatusPost "../types/StatusPost";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
module {
    public func getAllStatusPost(statusPosts : StatusPost.StatusPosts) : [StatusPost.StatusPost]  {
        Iter.toArray(statusPosts.vals());  
    };

    public func createStatusPost(statusPosts : StatusPost.StatusPosts, statusId : Nat, newStatusPost : StatusPost.StatusPost) : Result.Result<StatusPost.StatusPost, Text> {
        if (statusPosts.get(statusId) != null) {
            return #err("Status with this ID already exists.");
        };

        let now = Time.now();
        let statusPostWithTimestamp : StatusPost.StatusPost = {
            id = newStatusPost.id;
            postAuthor = newStatusPost.postAuthor;
            statusContent = newStatusPost.statusContent;
            statusLike = 0;
            likedBy = [];
            createdAt = now;
            };

        statusPosts.put(statusId, statusPostWithTimestamp);
        return #ok(statusPostWithTimestamp);
    };

    public func deleteStatusPost( statusMap : StatusPost.StatusPosts, statusId : Nat ) : Result.Result<Text, Text> {
        switch (statusMap.remove(statusId)) {
            case (null) { #err("Status not found."); };
            case (_) { #ok("Status deleted successfully."); };
        };
    };

};