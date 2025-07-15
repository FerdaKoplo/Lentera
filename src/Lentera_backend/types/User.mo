
    import Principal "mo:base/Principal";
    import Text "mo:base/Text";
    import HashMap "mo:base/HashMap";
    import Time "mo:base/Time";
    module {
        public type Users = HashMap.HashMap<Principal, User>;
        public type User = {
            id : Principal;
            username : Text;
            avatar : ?Text;
            hasProfile : Bool;
            createdAt : ?Time.Time;
        };
    };
