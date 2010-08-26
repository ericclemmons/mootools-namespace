Namespace.require("My.Examples.Node.Dependency1");

new Namespace('My.Examples.Node', {
    
    Requires: [
        "My.Examples.Node.Dependency2",
        "My.Examples.Node.Dependency3"
    ]
    
});
