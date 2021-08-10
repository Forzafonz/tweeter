$(document).ready(function() {

    //A function to update tweet characters count: if #of characters < 0, then the color will change to red.
    $("#tweet-text").on("input", function(){

      const tLen = $(this).val().length;
      const rLen = Number(140) - Number(tLen);
      const counter = $(this).parent("#tweet-form").children('.control').children('#text');
      counter.val(rLen);
      if (rLen < 0) {
        counter.css('color', 'red');
      } else {
        counter.css('color', 'white');
      }
    });
});
