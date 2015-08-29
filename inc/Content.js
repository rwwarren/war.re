'use strict';


var Content = React.createClass({
  render: function() {
      //<div className="content">
    var now = new Date;
    var theYear = now.getYear();
    if (theYear < 1900) {
      theYear = theYear + 1900
    }
    return (
      <div className="homeContainer">
        <h1>Ryan Warren</h1>
        <p>{'\u00A9'} {theYear} War.re</p>
      </div>
    );
  }
});

module.exports = Content;