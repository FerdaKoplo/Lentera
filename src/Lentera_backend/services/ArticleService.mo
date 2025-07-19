import Article "../types/Article";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

module {
    public func getAllArticles(articles : Article.Articles) : [Article.Article] {
        Iter.toArray(articles.vals());
    };

    public func getArticleByAuthor(articles : Article.Articles, authorArticleId : Principal) : [Article.Article] {
        Iter.toArray(
            Iter.filter<Article.Article>(
                articles.vals(),
                func(a) {
                    a.authorArticleId == authorArticleId
                }
            )
        )
    };

    public func getArticleDetail(articles : Article.Articles, articleId : Nat) : ?Article.Article {
        articles.get(articleId);
    };

    public func addArticle(articles : Article.Articles, articleId : Nat, newArticle : Article.Article) : Result.Result<Article.Article, Text> {
        if (articles.get(articleId) != null) {
            return #err("Article with this ID already exists.");
        };

        let now = Time.now();
        let articleWithTimestamp : Article.Article = {
            id = newArticle.id;
            authorArticleId = newArticle.authorArticleId;
            articleTitle = newArticle.articleTitle;
            articleContent = newArticle.articleContent;
            articleImage = newArticle.articleImage;
            createdAt = now;
        };

        articles.put(articleId, articleWithTimestamp);
        #ok(articleWithTimestamp)
    };

    public func updateArticle(articles : Article.Articles, articleId : Nat, updatedArticle : Article.Article) : Result.Result<Article.Article, Text> {
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

    public func updateArticleThumbnail(articlesMap : Article.Articles, articleId : Nat, newThumbnail : Text) : Result.Result<Article.Article, Text> {
        switch (articlesMap.get(articleId)) {
            case (null) {
                return #err("Article not found");
            };
            case (?article) {
                let updatedArticle = {
                    article with
                    articleImage = newThumbnail
                };
                articlesMap.put(articleId, updatedArticle);
                return #ok(updatedArticle);
            };
        };
    };

    public func deleteArticle(articles : Article.Articles, articleId : Nat) : Result.Result<Text, Text> {
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
