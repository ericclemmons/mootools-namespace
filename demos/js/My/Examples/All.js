new Namespace("My.Examples.All", {
    Requires: [
        "My.Examples.Base",
        "My.Examples.Extends",
        // Testing existence of already included dependencies
        "My.Examples.Base",
        "My.Examples.Extends"
    ],
    
    initialize: function() {
        new My.Examples.Base('Howdy');
        new My.Examples.Extends('Howdy There!');
    }
});