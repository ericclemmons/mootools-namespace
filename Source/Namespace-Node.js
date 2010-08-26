var Namespace = require('./Namespace.class'),
    fs        = require('fs');

$splat = function(stringOrArray) {
    return (typeof stringOrArray == 'string') ? [stringOrArray] : stringOrArray;
};

Namespace.prototype.parseOptions = function(options) {
    this.dependencyOptions.each(function(option) {
        var resources = $splat(options[option]);
        
        if (typeof resources == "undefined") {
            return;
        }
        
        resources.each(function(resource, i) {
            if (typeof resource == 'string') {
                Namespace.load(resource);
            }
        });
    });
};

Namespace.load = function(namespace) {
    var filename = Namespace.getBasePath() + namespace.split('.').join('/') + '.js';
    
    fs.readFile(filename, function(err, javascript) {
        if (err) throw err;
        
        eval(javascript.toString());
    });
};


module.exports = Namespace;