new Namespace("My.Examples.Base.Nesting", {
    
    Extends: "My.Examples.Base",
    
    initialize: function() {
        new My.Examples.Base("My.Examples.Base is still functional.");
    }
    
});