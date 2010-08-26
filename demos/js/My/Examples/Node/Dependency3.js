new Namespace('My.Examples.Node.Dependency3', {
    
    Requires: "My.Examples.Node.Dependency2",
    
    initialize: function() {
        console.log("I'm dependency #3!");
    }
});
