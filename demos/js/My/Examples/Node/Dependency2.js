new Namespace('My.Examples.Node.Dependency2', {
    
    Requires: "My.Examples.Node.Dependency1",
    
    Extends: "My.Examples.Node.Dependency2-1",
    
    initialize: function() {
        console.log("I'm dependency #2!");
    }
});
