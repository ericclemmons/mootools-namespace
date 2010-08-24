new Namespace("My.Examples.Base.Nesting", {
    
    Extends: "My.Examples.Base",
    
    initialize: function(message) {
        new My.Examples.Base(message);
    }
    
});