require.paths.unshift('Source');
require.paths.unshift('demos/js/Mootools/mootools-core/Source');

require('ServerSide-MooTools-Build').apply(GLOBAL);

var Namespace = require('Namespace.class');
Namespace.options.root = GLOBAL;

Namespace.require('My.Examples.Node');