import Community "../types/Community";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Array "mo:base/Array";
import User "../types/User";
import CommunityMember "../types/CommunityMember";
module {
    public func getAllCommunity(communities : Community.Communities) : [Community.Community] {
        Iter.toArray(communities.vals());
    };

    public func getCommunityByUser(communities : Community.Communities, authorId : Principal) : [Community.Community] {
         Iter.toArray(
            Iter.filter<Community.Community>(
                communities.vals(),
                func(c) {
                     c.authorCommunityId == authorId
                }
            )
        )
    };

    public func getCommunityDetail(community : Community.Communities, communityId: Nat) : ?Community.Community {
        community.get(communityId);
    };

    public func createCommunity(communities : Community.Communities, communityId : Nat, newCommunity : Community.Community ) : Result.Result<Community.Community, Text> {
        if (communities.get(communityId) != null) {
            return #err("Community with this ID already exists.");
        };

        let now = Time.now();
        let communityWithTimestamp : Community.Community = {
            id = communityId;
            authorCommunityId = newCommunity.authorCommunityId;
            communityTitle = newCommunity.communityTitle;
            communityBanner = newCommunity.communityBanner;
            communityMember = newCommunity.communityMember;
            createdAt = now;
        };
        communities.put(communityId, communityWithTimestamp);
        #ok(communityWithTimestamp);
    };

    public func updateCommmunity(communities : Community.Communities, communityId : Nat, updatedCommunity : Community.Community) : Result.Result<Community.Community, Text> {
        switch (communities.get(communityId)) {
            case (?_) {
                communities.put(communityId, updatedCommunity);
                #ok(updatedCommunity);
            };
            case (null) {
                #err("Community for this owner not found, cannot update.");
            };
        };
    };

    public func deleteCommunity( communities : Community.Communities, communityId : Nat) : Result.Result<Text, Text> {
        switch (communities.get(communityId)) {
            case (?_) {
                let _ = communities.remove(communityId);
                #ok("Community deleted successfully.");
            };
            case (null) {
                #err("Community for this owner not found, cannot delete.");
            };
        };
    };

    public func joinCommunity( communities : Community.Communities, communityId : Nat, userId : Principal ) : Result.Result<Text, Text> {
        switch (communities.get(communityId)) {
            case (?comm) {
                let alreadyJoined = Iter.filter<CommunityMember.CommunityMember>(
                    Iter.fromArray(comm.communityMember),
                    func(m : CommunityMember.CommunityMember) : Bool {
                        m.userId == userId
                    }
                ).next() != null;

                if (alreadyJoined) {
                    return #err("User already joined this community.");
                };

                let newMember : CommunityMember.CommunityMember = {
                    id = comm.communityMember.size();
                    userId = userId;
                    isEntry = true;
                };

                let updatedCommunity : Community.Community = {
                    id = comm.id;
                    authorCommunityId = comm.authorCommunityId;
                    communityTitle = comm.communityTitle;
                    communityBanner = comm.communityBanner;
                    communityMember = Array.append(comm.communityMember, [newMember]);
                    createdAt = comm.createdAt;
                };

                communities.put(communityId, updatedCommunity);
                #ok("User joined successfully.");
            };
            case null {
                #err("Community not found.");
            };
        };
    };


    public func leaveCommunity( communities : Community.Communities, communityId : Nat, userId : Principal ) : Result.Result<Text, Text> {

        switch (communities.get(communityId)) {
            case (?comm) {
                let updatedMembers = Array.filter<CommunityMember.CommunityMember>(
                    comm.communityMember,
                    func(m : CommunityMember.CommunityMember) : Bool {
                        m.userId != userId
                    }
                );

                if (updatedMembers.size() == comm.communityMember.size()) {
                    return #err("User not found in this community.");
                };

                // Update community with new member list
                let updatedCommunity : Community.Community = {
                    id = comm.id;
                    authorCommunityId = comm.authorCommunityId;
                    communityTitle = comm.communityTitle;
                    communityBanner = comm.communityBanner;
                    communityMember = updatedMembers;
                    createdAt = comm.createdAt;
                };

                communities.put(communityId, updatedCommunity);
                #ok("User left the community successfully.");
            };
            case (null) {
                #err("Community not found.");
            };
        };
    };
};