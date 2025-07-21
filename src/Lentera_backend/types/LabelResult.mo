import Text "mo:base/Text";
import Float "mo:base/Float";

module {
    public type LabelResult = {
    labelEmotion: [Text];
    confidence: [(Text, Float)];
   };
};