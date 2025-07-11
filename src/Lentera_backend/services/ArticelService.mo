import Article "../types/Article";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
module {
    public func getAllArticles(articles : Article.Articles) : [Article.Article]{
        Iter.toArray(articles.vals());
    };

    public func getArticleByAuthor(articles : Article.Articles, authorId: Principal) : [Article.Article]{
        Iter.toArray(
            Iter.filter<Article.Article>(
                articles.vals(),
                func(a) {
                     a.authorArticle.id == authorId
                }
            )
        )
    };

    public func getArticleDetail(article : Article.Articles, articleId: Nat) : ?Article.Article {
        article.get(articleId);
    };

    public func addArticle( articles : Article.Articles, articleId : Nat, newArticle : Article.Article) : Result.Result<Article.Article, Text> {
        if (articles.get(articleId) != null) {
            return #err("Article with this ID already exists.");
        };

        let now = Time.now();
        let articleWithTimestamp : Article.Article = {
            id = newArticle.id;
            authorArticle = newArticle.authorArticle;
            articleTitle = newArticle.articleTitle;
            articleContent = newArticle.articleContent;
            articleImage = newArticle.articleImage;
            createdAt = now;
        };

        articles.put(articleId, articleWithTimestamp);
        #ok(articleWithTimestamp)
    };

    public func updateArticle(articles : Article.Articles, articleId : Nat, updatedArticle  : Article.Article) : Result.Result<Article.Article, Text> {
        switch (articles.get(articleId)) {
            case (?_) {
                articles.put(articleId, updatedArticle);
                #ok(updatedArticle);
            };
            case (null) {
                #err("Article for this owner not found, cannot update.");
            };
        };
    };

     public func deleteArticle( articles : Article.Articles, articleId : Nat) : Result.Result<Text, Text> {
        switch (articles.get(articleId)) {
            case (?_) {
                let _ = articles.remove(articleId);
                #ok("Article deleted successfully.");
            };
            case (null) {
                #err("Article for this owner not found, cannot delete.");
            };
        };
    };


};