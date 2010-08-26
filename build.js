var path = require('path'),
    fs   = require('fs');

require.paths.unshift('Source');
require.paths.unshift('demos/js/Mootools/mootools-core/Source');
require.paths.unshift(process.argv[2]);

require('ServerSide-MooTools-Build').apply(GLOBAL);

var Namespace = require('Namespace-Node');

Namespace.options.root = GLOBAL;

Namespace.setBasePath(process.argv[2]);
Namespace.load(process.argv[3]);

