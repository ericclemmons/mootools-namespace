#   Mootools Namespace

![Screenshot](http://github.com/ericclemmons/mootools-namespace/raw/master/screenshot.png)

Allow `Class` declarations to support [Dojo-like packaging & namespacing][dojo].
For example, `My.Widget.Growl` would extend `My.Widget.Tips` and require
`Moo.Core.Request.HTML`:
    
    new Namespace("My.Widget.Growl", {
        Requires: "Moo.Core.Request.HTML",
        Extends: "My.Widget.Tooltip",
        ...
    });

##  Why?

Enterprise-level development, in my experience, requires organization & quality
on the client-side that is normally seen on the server-side.  Simply put, you would
find Zend Framework namespaced in the `/library/Zend/...` folder and, similarly, the
client-side scripts would likely be located in `/public/js/my/...`, where `my` is your
company or project name.

A good example of Javascript namespacing can be found in my tutorial
[Making Your Own Growl Widget With Dojo][growl].

##  Current Limitations

As Mootools is not yet namespaced (aside from folder structure), I've forked the
[Mootools Core][core] and [Mootools More][more] repositories to clean up structure
for autoloading & implement namespacing.  For example, `Fx.Tween` becomes
`Moo.Core.Fx.Tween`.  `Element.tween` continues to work, as well as `new Fx.Tween`.

Remember, this grew out of the need for namespacing within existing enterprise-level
code, not for improving upon Mootools' pseudo-namespacing.

## How to Use

Suppose you have a custom Growl widget that you would like on your current page...

### Include Namespace.class.js

*Remember, `Class.Extras` and `Request` are required for Namespace to work.*

    <script src="js/Namespace.class.js">

The base-path has been set to `js` automatically, as that is where the script is located.

### (Optional) Set the base-path to your modules

    <script>
        Namespace.setBasePath("My", "js/NotMine");
    </script>

### Either `require` your widget...

    <script>
        Namespace.require("My.Widget.Growl");
        // SJAX request to js/NotMine/Widget/Growl.js
        // If base-path is default, it would go to:
        //   js/My/Widget/Growl.js
        
        new My.Widget.Growl("Howdy There!");
    </script>

### ...or make it a dependency for a new class...

    <script>
        new Namespace("My.Login.Page", {
            Extends: "My.Widget.Growl",
            
            initialize: function(message) {
                this.parent(message);
            }
        });
        
        new My.Login.Page("Howdy There");
    </script>

Because the `Extends` class is in quotes, it is automatically loaded.  Had it not
been in quotes, the class/namespace would have to exist before-hand.

## Example - Require entire library

Often in large applications, you will need a whole library in the beginning to
prevent any delayed execution of events (animations, AJAX calls, etc.).

In the following example, we have an application that has a login page that may
allow the user to register or login with an existing account.  There may be specific
animations only used in this page, custom validation for the forms and their respective
templates, as well as events associated with elements on the page.

### Folder Structure

    /public
        /application
        /library
        /js
            /Moo
                /Core
                /More
                Namespace.js
            /My
                /Login
                    /Templates
                        Register.html
                        Login.html
                    All.js
                    Animations.js
                    Events.js
                    Form.js
                    Fx.js

### HTML - index.html

    <!-- Include the namespacing functionality -->
    <script src="js/Moo/Namespace.js"></script>
    
    <!-- Now, require  -->
    <script src="js/My/Login/All.js"></script>

### Javascript - /js/My/Login/All.js

    new Namespace("My.Login.All", {
        Requires: [
            "My.Login.Animations",
            "My.Login.Events",
            "My.Login.Form",
            "My.Login.Fx"
        ]
    });

## Demos

See the /demos folder.

[dojo]: http://docs.dojocampus.org/dojo/index#package-system
[wf]:   http://www.whitefence.com/
[growl]:http://blog.uxdriven.com/2009/09/08/making-your-own-growl-widget-with-dojo/
[core]: git@github.com:ericclemmons/mootools-core.git
[more]: git@github.com:ericclemmons/mootools-more.git