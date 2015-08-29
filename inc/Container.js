'use strict';

var Router = ReactRouter;
var { Route, RouteHandler, Link } = Router;
var Navigation = ReactRouter.Navigation;

var Container = React.createClass({
  mixins: [Navigation],
  render: function () {
    return (
      <div className="container">
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Container;