import ArticleComment "../types/ArticleComment";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Text "mo:base/Text";
module {
    public func getCommentedArticles( commentText : ArticleComment.ArticleComments, articleId : Nat ) : [ArticleComment.ArticleComment] {
        Iter.toArray(
            Iter.filter<ArticleComment.ArticleComment>(
                commentText.vals(),
                func(r) {
                    r.articleId == articleId
                }
            )
        )
    };

    public func createComment(commentMap : ArticleComment.ArticleComments, articleCommentId : Nat, newComment : ArticleComment.ArticleComment) : Result.Result<ArticleComment.ArticleComment, Text> {
        if (commentMap.get(articleCommentId) != null) {
            return #err("Comment with this ID already exists.");
        };

        let createdComment : ArticleComment.ArticleComment = {
            id = articleCommentId;
            articleId = newComment.articleId;
            commenterId = newComment.commenterId;
            commentText = newComment.commentText;
            commentedAt = Time.now();
        };

        commentMap.put(articleCommentId, createdComment);
        #ok(createdComment);
    };

    public func updateComment (commentMap : ArticleComment.ArticleComments, commentId : Nat, newText : Text) : Result.Result<ArticleComment.ArticleComment, Text> {

        switch (commentMap.get(commentId)) {
            case (null) { #err("Comment not found."); };
            case (?existingComment) {
                let updatedComment : ArticleComment.ArticleComment = {
                    id = existingComment.id;
                    articleId = existingComment.articleId;
                    commenterId = existingComment.commenterId;
                    commentText = newText;
                    commentedAt = Time.now();
                };

                commentMap.put(commentId, updatedComment);
                #ok(updatedComment);
            };
        };
    };

    public func deleteComment( commentMap : ArticleComment.ArticleComments, commentId : Nat ) : Result.Result<Text, Text> {
        switch (commentMap.remove(commentId)) {
            case (null) { #err("Comment not found."); };
            case (_) { #ok("Comment deleted successfully."); };
        };
    };
    
};