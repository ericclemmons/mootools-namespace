/*
    Script: Namespace.js
    
    Author: Eric Clemmons <eric@smarterspam.com>
    
    Description:    Allows for slightly new Class instantiations for name.spacing
*/

var Namespace = new Class({
    
    Implements: Options,
        
    options: {
        root:       window, // You can set the base for your namespace.  Defaults to `window`
        delimiter:  "."     // Delimiter for namespacing
    },
    
    // Accepts the namespace path "my.namespace.path" & the class options for instantiation
    initialize: function(namespace, options) {
        if (options.namespace) {
            this.setOptions(options.namespace);
        };
        
        // Parse options for strings where classes should exist
        options = this.parseOptions(options);
        
        // Return the instantiated class
        return this.getClass(namespace, options);
    },
    
    parseOptions: function(options) {
        // Replace `Extends: "myClass"` with `Extends: myClass` instantiation
        if ($type(options.Extends) === "string") {
            var extended = this.getClass(options.Extends) || this.load(options.Extends);
            
            if ($type(extended) === "class") {
                options.Extends = extended;
            } else {
                throw new Error("Extended class \"" + options.Extends + "\" does not exist or could not be loaded.");
                delete options.Extends;
            };
        }
        
        return options;
    },
    
    // Traverses down the namespace path and returns the (newly instantiated if not existing) class
    getClass: function(namespace, options) {
        var root = this.options.root;
        
        // Iterate through each section of the namespace
        namespace.split(this.options.delimiter).each(function(name, i, names) {
            // Up until the last leaf, create an object if undefined
            if (i < names.length - 1) {
                if (!root[name]) {
                    root[name] = {};
                }
            } else {
                // If the last leaf doesn't exist & we're looking to instantiate, instantiate the class
                if (!root[name] && options) {
                    return root[name] = new Class(options);
                }
            };
            
            root = root[name];
        });
        
        // Return the requested namespaced class
        return root;
    },
    
    load: function(namespace) {
        var path = "{basePath}/{namespace}.js".substitute({
            basePath:   Namespace.basePath,
            namespace:  namespace.replace(/\./g, '/')
        });
        
        (new Request({
            url:    path,
            method: 'GET',
            async:  false,
            evalResponse:   true
        })).send();
        
        return this.getClass(namespace);
    }
    
});

Namespace.setBasePath = function(path) {
    Namespace.basePath = path;
};

Namespace.getBasePath = function() {
    return Namespace.basePath;
};