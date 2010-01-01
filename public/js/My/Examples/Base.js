new Namespace("My.Examples.Base", {
    
    message: "No Message Set",
    
    initialize: function(message) {
        document.body.set('text', message);
    }
    
});