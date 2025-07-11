import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import CommunityMember "CommunityMember";
import User "User";
module {
    public type Communities = HashMap.HashMap<Nat, Community>;
    public type Community = {
        id : Nat;
        authorCommunity : User.User;
        communityTitle : Text;
        communityBanner : ?Text;
        communityMember : [CommunityMember.CommunityMember];
        createdAt : Time.Time; 
    };
    
};