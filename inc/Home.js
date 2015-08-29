'use strict';

var Navigation = ReactRouter.Navigation;

var Home = React.createClass({
  mixins: [Navigation],
  componentDidMount: function() {
    this.transitionTo('content');
  },
  render: function() {
    return (
      <div>
        Home
      </div>
    );
  }
});

module.exports = Home;