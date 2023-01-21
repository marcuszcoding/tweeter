$(document).ready(function() {
  $("#tweet-text").on("input", function(){
    let currentLength = $(this).val().length
    $(".counter").text(140-currentLength)
    if (currentLength > 140) {
      $(".counter").css("color", "red")
    } else {
      $(".counter").css("color", "initial")
    }
  });
});

// 1.) Ducment.ready accessing the file
// 2.) access the tweet text area and have it so on input we change the counter 
//     with a function
// 3.) 
