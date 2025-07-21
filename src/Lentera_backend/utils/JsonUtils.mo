import Result "mo:base/Result";
import Json "mo:json";
import Principal "mo:base/Principal";
import Types "../types/MentalState";
import LabelResult "../types/LabelResult";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

module JsonUtils {

  type JSON = Json.Json;

  public func fromJson(jsonText: Text) : Result.Result<Types.MentalState, Text> {
    switch (Json.parse(jsonText)) {
      case (#ok(json)) {
        switch (json) {
          case (#Object(fields)) {
            let journalId = findText(fields, "journalId");
            let userIdStr = findText(fields, "userId");

            let labelEmotion = findArray(fields, "labelEmotion");
            let confidence = findFloatArray(fields, "confidence");

            switch (journalId, userIdStr, labelEmotion, confidence) {
              case (?jid, ?uidStr, ?le, ?cf) {
                let uid = Principal.fromText(uidStr);

                let paired = zipTextFloat(le, cf);
                
                let labelEmotionResult : LabelResult.LabelResult = {
                  labelEmotion = le;
                  confidence = paired; 
                };

                let state : Types.MentalState = {
                  journalId = jid;
                  userId = uid;
                  labelEmotion = labelEmotionResult;
                  confidence = labelEmotionResult;
                };

                #ok(state)
              };
              case _ {
                #err("Missing or invalid fields")
              };
            }
          };
          case _ {
            #err("Expected object at top level")
          };
        }
      };
      case (#err(err)) {
        #err("JSON parsing error: " # debug_show(err))
      };
    }
  };

  // Custom zip function for Text and Float arrays
  func zipTextFloat(texts: [Text], floats: [Float]) : [(Text, Float)] {
    let size = if (texts.size() < floats.size()) texts.size() else floats.size();
    Array.tabulate<(Text, Float)>(size, func(i) {
      (texts[i], floats[i])
    });
  };

  func findText(fields: [(Text, JSON)], key: Text) : ?Text {
    var result: ?Text = null;
    for ((k, v) in fields.vals()) {
      if (k == key) {
        switch (v) {
          case (#String(s)) { result := ?s };
          case _ {};
        };
      };
    };
    result
  };

  func findArray(fields: [(Text, JSON)], key: Text) : ?[Text] {
    var result: ?[Text] = null;
    for ((k, v) in fields.vals()) {
      if (k == key) {
        switch (v) {
          case (#Array(a)) {
            result := ?Array.map<JSON, Text>(a, func(x) {
              switch (x) {
                case (#String(s)) { s };
                case _ { "" };
              };
            });
          };
          case _ {};
        };
      };
    };
    result
  };

  func findFloatArray(fields: [(Text, JSON)], key: Text) : ?[Float] {
    var result: ?[Float] = null;
    for ((k, v) in fields.vals()) {
      if (k == key) {
        switch (v) {
          case (#Array(arr)) {
            result := ?Array.map<JSON, Float>(arr, func(x) {
              switch (x) {
                case (#Number(n)) { n };
                case _ { 0.0 };
              };
            });
          };
          case _ {};
        };
      };
    };
    result
  };
};