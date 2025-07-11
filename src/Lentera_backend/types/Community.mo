import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import CommunityMember "CommunityMember";
module {
    public type Communities = HashMap.HashMap<Nat, Community>;
    public type Community = {
        id : Nat;
        communityTitle : Text;
        communityBanner : ?Text;
        communityMember : CommunityMember.CommunityMember;
    };
    
};