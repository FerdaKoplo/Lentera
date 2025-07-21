import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
module {
    public type ArticleComments = HashMap.HashMap<Nat, ArticleComment>;
    public type ArticleComment = {
        id : Nat;
        articleId : Nat;
        commenterId : Principal;
        commentText : Text;
        commentedAt : Time.Time;
    };
};