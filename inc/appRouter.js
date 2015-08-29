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
  <Route handler={Container} path="/">
    {/* home */}
    <DefaultRoute name="home" handler={Home}/>
    {/* admin */}
    <Route path="n/" name="content" handler={Content}/>
    {/* 404 */}
    <NotFoundRoute handler={FourOFour}/>
  </Route>
);


ReactRouter.run(routes, HistoryLocation, function(Handler) {
  React.render(<Handler />, document.body);
});