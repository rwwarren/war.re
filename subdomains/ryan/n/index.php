<!doctype html>
<html>
<head>
  <title>Ryan Warren Resume</title>
  <style media="screen" type="text/css">
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    background-color: #EBEFF0;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    font: 12px Verdana;
  }

  p {
    margin-top: 0;
    margin-bottom: .35em;
  }

  h1 {
    font: 1.8em Verdana;
    margin-bottom: .5em;
  }

  h2 {
    font: Bold 1.2em Verdana;
    text-transform: uppercase;
    border-bottom:1px #dddddd solid;
    margin-top: 1.0em;
    margin-bottom: .35em;
  }

  h3 {
    font: 1.2em Verdana;
    /*font: Bold 1.0em Verdana;
    text-transform: uppercase;*/
  }

  #content {
  /*  width: 825px; */
    padding-top: 1em;
    width: 850px;
    margin: 0 auto;
  }

  #header {
    text-align: center;
  }

  #content > #experience > ul {
    list-style: disc inside;
  /*
      columns: 2;
      -webkit-columns: 2;
      -moz-columns: 2;
      column-gap: 20px;
      -moz-column-gap: 20px;
      -webkit-column-count: 2;
      -webkit-column-gap: 20px;
  */
  }

  #content > div > ul {
    list-style: none;
  }

  #content > #experience > ul > li {
    margin-bottom: 0.2em;
  }

  #content > div > ul > li {
    margin-bottom: 0.8em;
  }

  ul ul {
    list-style: disc inside;
  }

  #header > #spacing {
    display: inline;
    margin-left: .7em;
    margin-right: .7em;

  }

  #content > #header, #experience, #work, #relatedactivities, #education {
    clear: both;
    width: 100%;
  }

  .activity {
    float: left;
    /*width: 45%;*/
    width: 100%;
    margin-right: 1em;
    /*margin-left: 1em;*/
    padding-right: 1em;
    margin-bottom: 1em;
  }

  .rightSide {
    float: left;
    width: 50%;
    margin-bottom: 1em;
    margin-left: 1em;
  }

  .for {
    font: bold 1.0em verdana;
    text-transform: uppercase;
  }

  /*
  .for span:before {
    margin: 0 5px;
    content: '-';
  }
  */

  span {
    font-weight: normal;
    font-size: .8em;
    text-transform: none;
    float: right;
    margin-right: 1em;
  }

  .for span {
    font-weight: normal;
    text-transform: none;
    float: right;
  }

  .as {
    font: normal 1.0em verdana;
  }

  ul {
    margin-left: .5em;
    margin-right: .5em;
    padding-left: .5em;
  }

  li {
    margin-bottom: .2em;
    clear: both;
  }

  .title {
    width: 75%;
    float: left;
  }

  .date {
    float: right;
  }
  </style>
  <script src="/n/google.js"></script>
</head>
<body>
  <div id="content">
    <div id="header">
      <h1>Ryan Warren</h1>
      <a href="https://www.linkedin.com/in/ryanwwarren" target="_blank">linkedin.com/in/ryanwwarren</a> <div id="spacing">&#149</div> ryan@war.re <div id="spacing">&#149</div> <a href="https://github.com/rwwarren" target="_blank">github.com/rwwarren</a>
    </div>
    <div id="experience">
      <h2>Technical Experience</h2>
      <ul>
        <li>Programming experience with PHP, Java, Linux, Apache, MySQL, and C++</li>
        <li>Desire to develop more web &amp; mobile programming experience</li>
        <li>Comfortable with bash and source control using git</li>
        <li>Favorite text-editor is Vim</li>
      </ul>
    </div>
    <div id="relatedactivities">
      <h2>Related Activities</h2>
      <ul>
        <li>
        <div class="activity">
          <div class="title"><h3><a href="https://github.com/rwwarren/door-lock/">PiDuinoLock:</a></h3></div>
          <div class="date">July 2013 - Present</div>
          <ul>
            <li>Created an automated door deadbolt using a Raspberry Pi and Arduino, which unlocks a door</li>
            <li>Programmed in Java, Objective C, Arduino implementation of Wiring, PHP, and MySQL to understand how different technologies work in unison</li>
            <li>Utilized 3rd party API (<a href="http://www.authy.com/">authy</a>) for 2 factor authentication to learn about implementing security</li>
            <li>Planned to expand easily to use Bluetooth and a <a href="http://www.getnymi.com/">Nymi</a> by using object oriented design</li>
          </ul>
        </div>
        </li>
      </ul>
      <ul>
        <li>
        <div class="activity">
          <div class="title"><h3>Coursework: Data Structures and Algorithms</h3></div>
          <div class="date">January 2013 - June 2014</div>
          <ul>
            <li>Implemented a HashMap with an array using separate chaining increasing knowledge of Java</li>
            <li>Created a Heap with a comparator and deque to solve a maze using an array to learn about deques</li>
            <li>Drew stars on a drawingpanel using guava collections to understand how to use Java collections</li>
            <li>Implemented breadth first search, depth first search, and Dijkstra's algorithm to a graph class</li>
            <li>Modified a quicksort algorithm and used runtimes to compare sorting algorithms to learn benefits of each</li>
          </ul>
        </div>
        </li>
      </ul>
      <ul>
        <li>
        <div class="activity">
          <div class="title"><h3>Web Programming:</h3></div>
          <div class="date">January 2010 - Present</div>
          <ul>
            <li>Operated <a href="http://wrixton.net">wrixton.net</a> for 7 years using a host service to learn about web hosting and programming</li>
            <li>Created blog and fraternity website using WordPress and phpBB to build codeless sites with tools</li>
            <li>Realized about source control and merging by using bitbucket and github for Git source control which helped</li>
          </ul>
        </div>
        </li>
      </ul>
    </div>
    <div id="work">
      <h2>Relevant Work Experience</h2>
      <ul>
        <li>
          <div class="activity">
            <div class="title"><h3>Software Engineer Intern, Live Nation </h3></div>
            <div class="date">June 2014 - December 2014</div>
            <ul>
              <li>Involved in developing applications for purchasing tickets from computers and mobile devices, through the core systems that process the order, and out to metrics and monitoring tools.</li>
              <li>Participated in all aspects of the development process including planning, design, implementation, and support.</li>
              <li>Commited code on highly scalable applications generating millions of dollars in revenue every day. </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="activity">
            <div class="title"><h3>Web Development Intern, Sporcle </h3></div>
            <div class="date">June 2013 - June 2014</div>
            <ul>
              <li>Designed and implemented a 3rd party API in PHP to allow 3 companies access to game data</li>
              <li>Created API authentication and rate limiting with Redis to control access companies using the API</li>
              <li>Improved server testing by creating an endpoint testing application using PHP and cURL to ensure different endpoints on the site are up and running</li>
              <li>Learned Objective C by delving through current applications to create new game applications</li>
            </ul>
          </div>
        </li>
        <li>
          <div class="activity">
            <div class="title"><h3>Technical Student Assistant, University of Washington</h3></div>
            <div class="date">June 2012 - October 2013</div>
            <ul>
              <li>Troubleshot application and network issues by using research to ensure computer uptime</li>
              <li>Imaged and configured hundreds of machines for students' use to guarantee student access to tools</li>
              <li>Installed and administered 12 physical servers which upgraded current backend infrastructure</li>
              <li>Trained 2 new employees through hands-on work to strengthen capability of independent work</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div id="education">
      <h2>Education</h2>
      <ul>
        <li>
          <div class="title"><h3>Bachelor of Science in Computer Science and Software Engineering University of Washington:</h3></div>
          <div class="date">Expected Graduation June 2015</div>
          <ul>
            <li>Relevant Courses: Object oriented programming, software engineering techniques, management principles, algorithms in C++, data structures in Java, and algorithms in Java</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</body>
</html>
