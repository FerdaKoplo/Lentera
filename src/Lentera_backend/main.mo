import Article "types/Article";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import ArticleService "services/ArticleService";
actor {
    stable var stableArticles : [Article.Article] = [] : [Article.Article];
    let articlesMap = HashMap.HashMap<Nat, Article.Article>(0, Nat.equal, Hash.hash);
    var articleCounter : Nat = 0;

    public shared(_) func addArticle(newArticle : Article.Article) : async Result.Result<Article.Article, Text> {
        articleCounter += 1;

        let articleId = articleCounter;
        let articleWithId = { newArticle with id = articleId };

        return ArticleService.addArticle(articlesMap, articleId, articleWithId);
    };

     public query func getAllArticles() : async [Article.Article] {
      return ArticleService.getAllArticles(articlesMap);
  };
};
