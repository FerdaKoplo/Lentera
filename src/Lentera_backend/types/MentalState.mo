import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
module {
    public type MentalState = {
        journalId: Text;
        userId: Principal;
        labelEmotion: [Text];
        confidence: [(Text, Float)];
    };
    
};