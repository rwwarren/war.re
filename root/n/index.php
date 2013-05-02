<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
require("$root../../inc/template.php");
class Home extends Page{

    function getTitle(){
      return 'Ryan Warren';
    }

    function getScripts(){
      return
        '<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>' .
        '<script src="/n/scripts/slider.js"></script>' .
        '';
    }

    function getBody(){
      return '' .
        '<div class="slider">' .
        //slider
          '<ul>' .
            '<li><p class="title">Content</p>' .
              '<p>Welcome to the site</p>' .
              '<p>Here is a couple links to things like my linkedin, Github, Bitbucket, things I have built, and resume</p>'.
              '<p>As always, it is continually under construction' .
              '<p>This is the most current work though' .
            '</li>' .
            '<li><p class="title">Linkedin</p>' .
              '<p>Take a peek my linkedin profile.</p>' .
              '<p><a href="http://www.linkedin.com/pub/ryan-warren/35/954/738">My Linkedin</a></p>' .
            '</li>' .
            '<li><p class="title">Github</p>' .
              '<p>Look at my Github</p>' .
              '<p><a href="https://github.com/rwwarren">Github Repo</a></p>'.
            '</li>' .
            '<li><p class="title">Bitbucket</p>' .
              '<p>My Bitbucket repo link is below</p>' .
              '<p><a href="https://bitbucket.org/rwwarren">Bitbucket Repo</a></p>'.
            '</li>' .
            '<li><p class="title">Stuff I\'ve Built</p>' .
              '<p>Some things I have built are:</p>' .
              '<p class="indent">This site, <a href="http://war.re/n">war.re</a></p>'.
              '<p class="indent">My other site running node js <a href="http://wrixton.net">wrixton.net</a></p>'.
              //'<p></p>'.
            '</li>' .
            '<li><p class="title">Resume</p>' .
              '<p>Quick summary my resume!</p>' .
              '<p>Web programming experience wih Linux, Apache, MySQL, and PHP</p>' .
              '<p>Running and configuring servers and websites</p>' .
              '<p><a href="http://ryan.war.re/n">Link to my Resume</a></p>' .
            '</li>' .
          '</ul>' .
          '<script>' .
            'var sliders = [];' .
            '$(\'.slider\').each(function() {' .
              'sliders.push(new Slider(this))' .
            '})' .
          '</script>' .
        '</div>' .
        '';
    }

    function getLeftNav() {
      return
        '<ul>' .
          '<li><a href="javascript:sliders[0].goTo(0)">Content</a></li>' .
          '<li><a href="javascript:sliders[0].goTo(1)">Linkedin</a></li>' .
          '<li><a href="javascript:sliders[0].goTo(2)">Github</a></li>' .
          '<li><a href="javascript:sliders[0].goTo(3)">Bitbucket</a></li>' .
          '<li><a href="javascript:sliders[0].goTo(4)">Stuff I\'ve Built</a></li>' .
          '<li><a href="javascript:sliders[0].goTo(5)">Resume</a></li>' .
        '</ul>' .
        '';
    }

}
$page = new Home;
$page->render();
?>
