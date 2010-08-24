new Namespace("My.Examples.Extends", {
    
    Extends: "My.Examples.Base",
    
    initialize: function(message) {
        this.parent(document.body.get('text') + message + " <i>Called by My.Examples.Extends</i>");
    }
    
});