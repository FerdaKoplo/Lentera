import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import User "User";

module {
    public type Articles = HashMap.HashMap<Nat, Article>;
    public type Article = {
        id : Nat;
        authorArticleId : Principal;
        articleTitle : Text;
        articleContent : Text;
        articleImage : Text;
        createdAt : Time.Time;
    };
};
