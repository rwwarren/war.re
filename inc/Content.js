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

        <div className="text">
          <a href="http://ryan.war.re/n">My Resume</a>
        </div>
        <br/>

        <div className="text">
          <a href="https://github.com/rwwarren">
            <img src="/GitHub-Mark-64px.png"/> Github
          </a>
        </div>
        <br/>

        <div className="text">
          <a href="https://linkedin.com/in/ryanwwarren">
            <img src="/In-Black-66px-R.png"/> Linkedin
          </a>
        </div>
        <p className="text">{'\u00A9'} {theYear} War.re</p>
      </div>
    );
  }
});

module.exports = Content;