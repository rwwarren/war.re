<?php
//TODO make a favicon
abstract class Page {
  final public function render(){
    $output = '<html>' .
      '<head>' .
      '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />' .
        '<title>' .
        $this->getTitle() .
        '</title>' .
        '<link rel="stylesheet" type="text/css" href="/n/scripts/styles.css" />' .
        $this->getScripts() .
      '</head>' .
      '<body>' .
        '<div id="container">' .
          '<div id="header">' .
            $this->getHeader() .
          '</div>' .
          //TODO add leftNAV
          '<div id="contents">' .
            '<div id="leftNav">'.
              $this->getLeftNav() .
            '</div>'.
            '<div id="pagecontent">' .
              $this->getBody() .
            '</div>' .
            '<div id="right">' .
            '</div>' .
          '</div>'.
          '<div id="footer">' .
            $this->getFooter() .
          '</div>' .
        '</div>' .
      '</body>' .

      '<html>';
    echo $output;
  }

  public function getHeader(){
    //TODO MAKE THIS 
    return
      //'This is a header';
      '';
  }

  public function getLeftNav(){
    //TODO MAKE THIS 
    return
    //'Left Nav';
    ' ';
  }

  public function getFooter(){
    //TODO MAKE THIS 
    return
      //'Footer';
      '';
  }

  abstract function getTitle();
  abstract function getScripts();
  abstract function getBody();

}

?>
