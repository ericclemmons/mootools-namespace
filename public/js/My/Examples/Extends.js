new Namespace("My.Examples.Extends", {
    
    Extends: "My.Examples.Base",
    
    initialize: function(message) {
        this.parent(message + " (extending My.Examples.Base)");
    }
    
});