(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Router = ReactRouter;
var $__0=      Router,Route=$__0.Route,RouteHandler=$__0.RouteHandler,Link=$__0.Link;
var Navigation = ReactRouter.Navigation;

var Container = React.createClass({displayName: "Container",
  mixins: [Navigation],
  render: function () {
      //<div className="homeContainer">
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement(RouteHandler, null)
      )
    );
  }
});

module.exports = Container;

},{}],2:[function(require,module,exports){
'use strict';

var Content = React.createClass({displayName: "Content",
  render: function() {
    var now = new Date;
    var theYear = now.getYear();
    if(theYear < 1900) {
      theYear = theYear + 1900
    }
    return (
      React.createElement("div", {className: "homeContainer"}, 
        React.createElement("h1", null, "Ryan Warren"), 
        React.createElement("br", null), 

        React.createElement("p", {className: "subtitle"}, 
          "Software Engineer"
        ), 

        React.createElement("p", {className: "info"}, 
          "Hi! I am Seattle Java developer currently working for ", React.createElement("a", {href: "https://porch.com"}, "Porch.com"), "."
        ), 

        React.createElement("p", {className: "info"}, 
          "I am currently working on a personal project to learn about react.js among other skills." + ' ' +
          "Click ", React.createElement("a", {href: "https://github.com/rwwarren/door-lock"}, "here"), " to check it out."
        ), 

        React.createElement("p", {className: "info"}, 
          "If you would like to learn a little more, see my ", React.createElement("a", {href: "http://ryan.war.re/n"}, "resume"), "."
        ), 

        React.createElement("div", {className: "info"}, 
          React.createElement("a", {href: "http://ryan.war.re/n"})
        ), 
        React.createElement("br", null), 
        React.createElement("a", {href: "https://github.com/rwwarren"}, 
          React.createElement("img", {src: "/GitHub-Mark-64px.png"})), 
        React.createElement("a", {href: "https://linkedin.com/in/ryanwwarren"}, 
          React.createElement("img", {src: "/In-Black-66px-R.png"})), 
        React.createElement("a", {href: "http://stackoverflow.com/users/1879792/ryan-warren"}, 
          React.createElement("img", {src: "/stackoverflow-xxl.png"})), 

        React.createElement("p", {className: "text"}, '\u00A9', " ", theYear, " War.re")
      )
    );
  }
});

module.exports = Content;

},{}],3:[function(require,module,exports){
'use strict';

//var NestedStatus = require('../../node_modules/react-nested-status/index');
//var NestedStatus = NestedStatus;

var Admin = React.createClass({displayName: "Admin",
  //mixins: [NestedStatus],

  render: function() {
    return (
      React.createElement("div", null, 
        "404 nott found :("
      )
    );
  }
});

module.exports = Admin;

},{}],4:[function(require,module,exports){
'use strict';

var Navigation = ReactRouter.Navigation;

var Home = React.createClass({displayName: "Home",
  mixins: [Navigation],
  componentDidMount: function() {
    this.transitionTo('content');
  },
  render: function() {
    return (
      React.createElement("div", null, 
        "Home"
      )
    );
  }
});

module.exports = Home;

},{}],5:[function(require,module,exports){
'use strict';
var Container = require('./Container');
var FourOFour = require('./FourOFour');
var Home = require('./Home');
var Content = require('./Content');

var DefaultRoute = ReactRouter.DefaultRoute;
var HistoryLocation = ReactRouter.HistoryLocation;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Route = ReactRouter.Route;

var routes = (
  React.createElement(Route, {handler: Container, path: "/"}, 
    /* home */
    React.createElement(DefaultRoute, {name: "home", handler: Home}), 
    /* admin */
    React.createElement(Route, {path: "n", name: "contentNoSlash", handler: Content}), 
    React.createElement(Route, {path: "n/", name: "content", handler: Content}), 
    /* 404 */
    React.createElement(NotFoundRoute, {handler: FourOFour})
  )
);


ReactRouter.run(routes, HistoryLocation, function(Handler) {
  React.render(React.createElement(Handler, null), document.body);
});

},{"./Container":1,"./Content":2,"./FourOFour":3,"./Home":4}]},{},[5]);
