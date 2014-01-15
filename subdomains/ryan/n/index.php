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
  font: 1.4em Verdana;
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
  font: Bold 1.0em Verdana;
  text-transform: uppercase;
}

#content {
  width: 825px;
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

#content > #header, #experience, #work, #activities, #eduction {
  clear: both;
  width: 100%;
}

.leftSide {
  float: left;
  width: 45%;
  margin-right: 1em;
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

.for span:before {
  margin: 0 5px;
  content: '-';
}

.for span {
  font-weight: normal;
  text-transform: none;
}

.as {
  font: normal 1.0em verdana;
  text-transform: uppercase;
}

ul {
  margin-left: .5em;
  padding-left: .5em;
}

li {
  margin-bottom: .2em;
}
</style>
</head>
<body>
  <div id="content">
    <div id="header">
      <h1>Ryan Warren</h1>
      <p>Computer Science and Software Engineering - University of Washington</p>
      <p>ryan@war.re</p>
    </div>
    <div id="experience">
      <h2>Technical Experience</h2>
      <ul>
        <li>Web programming experience with Linux, Apache, MySQL, and PHP</li>
        <li>Fascinated by server administration</li>
        <li>Desire to develop more web &amp; mobile programming experience</li>
        <li>Comfortable with bash and source control using git</li>
        <li>Favorite text-editor is Vim</li>
      </ul>
    </div>
    <div id="work">
      <h2>Relevant Work Experience</h2>
      <ul>
        <li>
          <div class="leftSide">
            <div class="for">Sporcle<span>June 2013 to Present</span></div>
            <div class="as">Web Development Intern</div>
            <ul>
              <li>Designing and implementing a 3rd party API</li>
              <li>API authentication and rate limiting with redis</li>
              <li>Improving server testing by creating an endpoint testing application</li>
              <li>Improved speed of AWS use by updating AWS SDK throughout the site</li>
              <li>Using perforce as source control</li>
              <li>Learning objective c to create new game apps</li>
            </ul>
          </div>
        </li>
        <li>
          <div class="rightSide">
            <div class="for">University of Washington<span>June 2012 to October 2013</span></div>
            <div class="as">Technical Student Assistant</div>
            <ul>
              <li>Imaging and configuring machines for students' use</li>
              <li>Troubleshooting application and network issues</li>
              <li>Installing and administering physical servers</li>
              <li>Training new employees</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div id="activities">
      <h2>Related Activities</h2>
      <ul>
        <li>
        <div class="leftSide">
          <h3>Personal Lock Project:</h3>
          <ul>
            <li>In the process of using a Raspberry Pi and Arduino to create an automated door deadbolt</li>
            <li>Uses Java, Ojective C, Arduino implementation of Wiring, PHP, and MySQL</li>
            <li>Uses 3rd party APIs like <a href="http://www.authy.com/">authy</a> for 2 factor authentication</li>
            <li>End goal is to have a secure mobile, web, and NFC method to unlock a door</li>
            <li>Eventually plan on expanding to use bluetooth and a <a href="http://www.getnymi.com/">nymi</a></li>
          </ul>
        </div>
        </li>
      </ul>
      <ul>
        <li>
        <div class="rightSide">
          <h3>School Projects:</h3>
          <ul>
            <li>Implemented a HashMap with an array using separate chaining</li>
            <li>Created a Heap with a comparator and deque to solve a maze using an array </li>
            <li>Drew stars on a drawingpanel using guava collections</li>
            <li>Used the Gale-Sharpley algorithm to create a marriage solver</li>
            <li>Implemented breadth first search, depth first search, and Dijkstra's algorithm to a graph class</li>
            <li>Modified a quicksort algorithm, also used runtimes to show what sorting algorithm was picked</li>
          </ul>
        </div>
        </li>
      </ul>
      <ul>
        <li>
        <div class="leftSide">
          <h3>Server Administration:</h3>
          <ul>
            <li>Configured a physical server from scratch with Ubuntu and Apache</li>
            <li>Set up an Amazon ec2 linux server with Apache and node.js</li>
            <li>Configured a LAMP stack with a Raspberry Pi</li>
          </ul>
        </div>
        </li>
      </ul>
      <ul>
        <li>
        <div class="rightSide">
          <h3>Web Programming:</h3>
          <ul>
            <li>Running <a href="http://wrixton.net">wrixton.net</a>, a personal website, for seven years</li>
            <li>Developing simple user-authenticated websites using PHP and MySQL</li>
            <li>Setting up and hosting forums using phpBB</li>
            <li>Creating personal blog and fraternity website using WordPress</li>
            <li>Experience using git with bitbucket and github for source control</li>
          </ul>
        </div>
        </li>
      </ul>
    </div>
    <div id="education">
      <h2>Education</h2>
      <ul>
        <li>
          <h3>University of Washington:</h3>
          <ul>
            <li>Candidate for Bachelor of Science in Computer Science and Software Engineering, anticipating April 2015 graduation</li>
            <li>Learned about data structures, algorithms, and object oriented programming in Computer Programming I &amp; II</li>
            <li>Currently learning software engineering techniques, management principles, and algorithms in c++</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</body>
</html>
