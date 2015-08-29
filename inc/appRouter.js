'use strict';
var Container = require('./Container');
var FourOFour = require('./FourOFour');
var Home = require('./Home');
var Content = require('./Content');

//var isMobile = require('./isMobile');
//if (isMobile()) {
//    React.initializeTouchEvents(true);
//}

// DO NOT REMOVE
//require('./ErrorHandling').init();
//require('./FBSDK').init();
//require('./URLFix').fix();

var DefaultRoute = ReactRouter.DefaultRoute;
var HistoryLocation = ReactRouter.HistoryLocation;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Route = ReactRouter.Route;

var routes = (
  //{/* config */}
  <Route handler={Container} path="/">
    {/* home */}
    <DefaultRoute name="home" handler={Home}/>
    {/* admin */}
    <Route path="n/" name="n" handler={Content}/>
    {/* 404 */}
    <NotFoundRoute handler={FourOFour}/>
  </Route>
);


ReactRouter.run(routes, HistoryLocation, function(Handler) {
  React.render(<Handler />, document.body);
});