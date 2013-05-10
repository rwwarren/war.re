$(document).ready(function() {
   
   setHeight($('#right'), $('#leftNav'), $('#pagecontent'));
        
});

// sets height of element 1 to equal the height of element 2
function setHeight(elem1, elem2, elem3) {
   var height = elem2.height()
   elem1.css('height', height); 
   elem3.css('height', height);
}
