
import Article "types/Article";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import ArticleService "services/ArticleService";
import Community "types/Community";
import CommunityService "services/CommunityService";
import User "types/User";
import Discussion "types/Discussion";
import DiscussionService "services/DiscussionService";
import DiscussionReply "types/DiscussionReply";
import DiscussionReplyService "services/DiscussionReplyService";
import UserService "services/UserService";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Time "mo:base/Time";
import JournalService "services/JournalService";
import Journal "types/Journal";

actor {

    stable var stableUser : [User.User] = [];
    var userMap : User.Users = HashMap.HashMap(0, Principal.equal, Principal.hash);

    
    stable var stableArticles : [Article.Article] = [] : [Article.Article];
    let articlesMap = HashMap.HashMap<Nat, Article.Article>(0, Nat.equal, Hash.hash);
    var articleCounter : Nat = 0;

    stable var stableCommunites : [Community.Community] = [] : [Community.Community];
    let communityMap = HashMap.HashMap<Nat, Community.Community>(0, Nat.equal, Hash.hash);
    var communityCounter : Nat = 0;

    stable var stableDiscussions : [Discussion.Discussion] = [] : [Discussion.Discussion];
    let discussionMap = HashMap.HashMap<Nat, Discussion.Discussion>(0, Nat.equal, Hash.hash);
    var discussionCounter : Nat = 0;

    stable var stableDiscussionReplies : [DiscussionReply.DiscussionReply] = [] : [DiscussionReply.DiscussionReply];
    let discussionReplyMap = HashMap.HashMap<Nat, DiscussionReply.DiscussionReply>(0, Nat.equal, Hash.hash);
    var discussionReplyCounter : Nat = 0;

    let journalService = JournalService.JournalService();

    // implementation of article service
    public shared(_) func addArticle(newArticle : Article.Article) : async Result.Result<Article.Article, Text> {
        articleCounter += 1;
        
        let articleId = articleCounter;
        let articleWithId = { newArticle with id = articleId };

        return ArticleService.addArticle(articlesMap, articleId, articleWithId);
    };

    public shared(_) func updateArticle(articleId : Nat, updatedArticle : Article.Article) : async Result.Result<Article.Article, Text> {
        return ArticleService.updateArticle(articlesMap, articleId, updatedArticle);
    };
    
    public shared(_) func deleteArticle(articleId : Nat) : async Result.Result<Text, Text> {
        return ArticleService.deleteArticle(articlesMap, articleId);
    };

    public query func getAllArticles() : async [Article.Article] {
      return ArticleService.getAllArticles(articlesMap);
    };

    public query func getArticleByAuthor(authorId : Principal) : async[Article.Article] {
        return ArticleService.getArticleByAuthor(articlesMap, authorId)
    };
    public query func getArticleDetail(articleId : Nat) : async ?Article.Article {
        return ArticleService.getArticleDetail(articlesMap, articleId);
    };


    // implementation of community service function
    public shared(_) func createCommunity(newCommunity : Community.Community) : async Result.Result<Community.Community, Text> {
        communityCounter += 1;

        let communityId = communityCounter;
        let communityWIthId = { newCommunity with id = communityId };

        return CommunityService.createCommunity(communityMap, communityId, communityWIthId);
    };

     public shared(_) func updateCommunity(communityId : Nat, updatedCommunity : Community.Community) : async Result.Result<Community.Community, Text> {
        return CommunityService.updateCommmunity(communityMap, communityId, updatedCommunity);
    };
    
    public shared(_) func deleteCommunity(communityId : Nat) : async Result.Result<Text, Text> {
        return CommunityService.deleteCommunity(communityMap, communityId);
    };

    public query func getAllCommunity() : async [Community.Community] {
      return CommunityService.getAllCommunity(communityMap);
    };

    public query func getCommunityByUser(authorCommunity : Principal) : async[Community.Community] {
        return CommunityService.getCommunityByUser(communityMap, authorCommunity)
    };

    public query func getDetailCommunity(communityId : Nat) : async ?Community.Community {
        return CommunityService.getCommunityDetail(communityMap, communityId);
    };

    public shared(_) func joinCommunity(communityId : Nat, userId : Principal, username : Text, avatar : ?Text, hasProfile : Bool) : async Text {
        let user : User.User = {
            id = userId;
            username = username;
            avatar = avatar;
            hasProfile = hasProfile;
            createdAt = null;
        };

        let result = CommunityService.joinCommunity(communityMap, communityId, userId);

        switch (result) {
            case (#ok(msg)) msg;
            case (#err(e)) "Error: " # e;
        };
    };

    // implementation of discussion service
    public shared(_) func createDiscussion(newDiscussion : Discussion.Discussion) : async Result.Result<Discussion.Discussion, Text> {
        discussionCounter += 1;

        let discussionId = discussionCounter;
        let discussionWIthId = { newDiscussion with id = discussionId };

        return DiscussionService.createDiscussion( discussionMap, discussionId, discussionWIthId.communityId, discussionWIthId);
    };

    public shared(_) func updateDiscussion(discussionId : Nat, updatedDiscussion : Discussion.Discussion) : async Result.Result<Discussion.Discussion, Text> {
        return DiscussionService.updateDiscussion(discussionMap, discussionId, updatedDiscussion);
    };

    public shared(_) func deleteDiscussion(discussionId : Nat) : async Result.Result<Text, Text> {
        return DiscussionService.deleteDiscussion(discussionMap, discussionId);
    };

    public query func getAllDiscussion() : async [Discussion.Discussion] {
      return DiscussionService.getAllDiscussion(discussionMap);
    };

    public query func getDiscussionByUser(authorDiscussion : Principal) : async[Discussion.Discussion] {
        return DiscussionService.getDiscussionByUser(discussionMap, authorDiscussion)
    };

    public query func getDetailDiscussion(discussionId : Nat) : async ?Discussion.Discussion {
        return DiscussionService.getDetailDiscussion(discussionMap, discussionId);
    };

    // implementation of discussion reply service
    public shared(_) func createDiscussionReply(newDiscussionReply : DiscussionReply.DiscussionReply) : async Result.Result<DiscussionReply.DiscussionReply, Text> {
        discussionReplyCounter += 1;

        let discussionReplyId = discussionReplyCounter;
        let discussionReplyWIthId = { newDiscussionReply with id = discussionReplyId };

        return DiscussionReplyService.createDiscussionReply( discussionReplyMap, discussionReplyId, discussionReplyWIthId);
    };

    public shared(_) func updateDiscussionReply(discussionReplyId : Nat, updatedDiscussionReply : DiscussionReply.DiscussionReply) : async Result.Result<DiscussionReply.DiscussionReply, Text> {
        return DiscussionReplyService.updateDiscussionReply(discussionReplyMap, discussionReplyId, updatedDiscussionReply);
    };

    public shared(_) func deleteDiscussionReply(discussionReplyId : Nat) : async Result.Result<Text, Text> {
        return DiscussionReplyService.deleteDiscussionReply(discussionReplyMap, discussionReplyId);
    };

    public query func getRepliesByDiscussionId(discussionId : Nat) : async[DiscussionReply.DiscussionReply] {
        return DiscussionReplyService.getRepliesByDiscussionId(discussionReplyMap, discussionId)
    };
    
     system func preupgrade() {
    stableUser := Iter.toArray(userMap.vals());
  };

  system func postupgrade() {
    for (user in stableUser.vals()) {
      userMap.put(user.id, user);
    };
    stableUser := [];
  };

  // Fimplementasi dari fungsi user
  public shared(msg) func registerUser(username : Text) : async Result.Result<User.User, Text> {
    let caller = msg.caller;
    let result = UserService.registerUser(userMap, caller, username);
    switch (result) {
      case (#ok(user)) return #ok(user);
      case (#err(e)) return #err(e);
    }
  };
  public shared query func getUserByPrincipal(p : Principal) : async Result.Result<User.User, Text> {
    switch (userMap.get(p)) {
      case (?user) return #ok(user);
      case null return #err("User not found");
    }
  };
  public shared(msg) func getCurrentUser() : async ?User.User {
    let caller = msg.caller;
    return UserService.getCurrentUser(Iter.toArray(userMap.vals()), caller);
  };
  public query func getUserByUsername(username : Text) : async ?User.User {
    return UserService.getUserByUsername(userMap, username);
  };

  public shared(msg) func updateUserProfile(username: Text, avatar: ?Text) : async Result.Result<User.User, Text> {
    let caller = msg.caller;
    switch (userMap.get(caller)) {
      case null return #err("User not found");
      case (?user) {
        let updated: User.User = {
          id = user.id;
          username = username;
          avatar = avatar;
          hasProfile = true; 
          createdAt = user.createdAt;
        };
        userMap.put(caller, updated);

        stableUser := Array.filter<User.User>(stableUser, func(u) { u.id != caller });
        stableUser := Array.append(stableUser, [updated]);

        return #ok(updated);
      };
    };
  };

  // implementasi dari fungsi journal
  public shared(msg) func createJournal(
    note: Text,
    mood: Text,
    emotions: ?[Text],
    emotionTrigger: ?[Text],
    timestamp: Time.Time // tambahan baru
  ) : async Result.Result<Journal.Journal, Text> {
    let caller = msg.caller;
    return journalService.createJournal(caller, note, mood, emotions, emotionTrigger, timestamp);
  };

  public shared(msg) func getMyJournal() : async ?[Journal.Journal] {
    let caller = msg.caller;
    return journalService.getByUser(caller);
  }
};
    