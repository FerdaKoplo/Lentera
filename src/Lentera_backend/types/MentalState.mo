import LabelResult "LabelResult";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
module {
    public type MentalState = {
        journalId: Text;
        userId: Principal;
        labelEmotion: LabelResult.LabelResult;
        confidence: LabelResult.LabelResult
    };
    
};