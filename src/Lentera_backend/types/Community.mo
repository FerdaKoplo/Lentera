import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import User "User";
import CommunityMember "CommunityMember";
module {
    public type Communities = HashMap.HashMap<Nat, Community>;
    public type Community = {
        id : Nat;
        authorCommunityId : Principal;
        communityTitle : Text;
        communityBanner : ?Text;
        communityMember : [CommunityMember.CommunityMember];
        createdAt : Time.Time; 
    };
};