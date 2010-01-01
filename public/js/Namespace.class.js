/*
    Script: Namespace.class.js
    
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
        var params = ["Extends", "Requires"];
        
        // Iterate through each type of dependency (i.e. "Extends")
        params.each(function(param) {
            var resources = $splat(options[param]);
            
            resources.each(function(resource, i) {
                // If the dependency isn't a class yet, try to load the class
                if ($type(resource) === "string") {
                    // Get existing class or load it via SJAX
                    var resource = this.getClass(resource) || this.load(resource);
                    
                    // If class finally exists, assign it to it's key (for Requires)
                    // or to the param itself (for Extends)
                    if ($type(resource) === "class") {
                        if ($type(options[param]) === "array") {
                            options[param][i] = resource;
                        } else {
                            options[param] = resource;
                        }
                    } else {
                        throw new Error(reference + " class \"" + resource + "\" does not exist or could not be loaded.");
                    }
                }
            }, this);
        }, this);
        
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
            basePath:   Namespace.getBasePath(),
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
    return Namespace.basePath ? Namespace.basePath : ".";
};

// Initialize base path based on Namespace script & document URL
;(function() {
    // Get the last script loaded (should be this script)
    var script = $$('script').getLast();
    // Trim off the script name
    var jsUrl = script.src.substring(0, script.src.lastIndexOf("/"));
    // Trim off the page name as well
    var baseUrl = document.URL.substring(0, document.URL.lastIndexOf("/") + 1);
    // Subtract page path from script path to get script subfolder
    var path = jsUrl.replace(baseUrl, '');
    
    Namespace.setBasePath(path);
})();