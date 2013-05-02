<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
require("$root/../inc/template.php");
class NotFoundError extends Page{

    function getTitle(){
      return '404 Error';

    }

    function getScripts(){
      return
        '';
    }

    function getBody(){
      return '' .
        '<p align="center">There has been a page not found error!</p>' .
        '<p align="center">Click <a href="http://war.re/n/">here</a> to ' .
        'go to the index</p>' .
        '';
    }

}
$page = new NotFoundError;
$page->render();
?>
