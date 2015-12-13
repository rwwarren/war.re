'use strict';

var Content = React.createClass({
  render: function() {
    //<div className="content">
    var now = new Date;
    var theYear = now.getYear();
    if(theYear < 1900) {
      theYear = theYear + 1900
    }
    return (
      <div className="homeContainer">
        <h1>Ryan Warren</h1>
        <br/>

        <p className="subtitle">
          Software Engineer
        </p>
        <p>
          Hi my name is Ryan Warren
        </p>
        <div className="info">
          <a href="http://ryan.war.re/n"></a>
        </div>
        <br/>
          <a href="https://github.com/rwwarren">
            <img src="/GitHub-Mark-64px.png"/></a>
          <a href="https://linkedin.com/in/ryanwwarren">
            <img src="/In-Black-66px-R.png"/></a>
          <a href="http://stackoverflow.com/users/1879792/ryan-warren">
            <img src="/stackoverflow-xxl.png"/></a>
        <p className="text">{'\u00A9'} {theYear} War.re</p>
      </div>
    );
  }
});

module.exports = Content;