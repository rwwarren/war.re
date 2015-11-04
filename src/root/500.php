<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
require("$root/../inc/template.php");
class FiveHundError extends Page{

    function getTitle(){
      return 'Error';
    }

    function getScripts(){
      return
        '';
    }

    function getBody(){
      return '' .
        '<p align="center">There has been an error!</p>' .
        '<p align="center">Click <a href="http://war.re/n/">here</a> to ' .
        'go to the index</p>' .
        '';
    }

}
$page = new FiveHundError;
$page->render();
?>
