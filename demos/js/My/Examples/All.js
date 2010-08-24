new Namespace("My.Examples.All", {
    Requires: [
        "My.Examples.Base",
        "My.Examples.Extends",
        // Testing existence of already included dependencies,
        // so these shouldn't be loaded twice
        "My.Examples.Base",
        "My.Examples.Extends"
    ],
    
    initialize: function(message) {
        new My.Examples.Base("My.Examples.Base test text.");
        new My.Examples.Extends(message);
    }
});