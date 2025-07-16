import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
module {
    public type Journals = HashMap.HashMap<Principal, [Journal]>;
    public type Journal = {
        id: Text;
        userId : Principal;
        note : Text;
        mood : Text;
        emotions: ?[Text];
        emotionTrigger: ?[Text];
        timeCreated: Time.Time;
        dateCreated: Time.Time;
    };
};
