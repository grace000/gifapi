$(document).ready(function () {

var topics = [
	"no",
	"dislike",
	"love",
	"eye roll",
	"laugher",
	"dance",
	"angry",
	"joy",
	"clap",
	"facepalm",
	"idk",
	"suspicious"
];


function gifReaction() {
  $("#gifs-appear-here").empty();

    for (var k = 0; k < topics.length; k++) {
      var newTopic = $("<button>").text(topics[k]);
      newTopic.addClass("btn btn-primary");
      newTopic.attr('data-reaction', topics[k]);
      $('#btn-section').append(newTopic);
    }
    getReaction();
}   gifReaction();

 // var gifHome = $('gifs-appear-here');


function getReaction (){
  $("#btn-section").on("click","button",function(){ 

      var reactions = $(this).attr("data-reaction");
      // var reactions = $(this).attr("data-name");
      console.log(reactions);
      //Building the URL needed to query the database
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        reactions + "&api_key=dc6zaTOxFJmzC&limit=5";

      //run AJAX call to giphy API
      $.ajax({
        url: queryURL,
        method: "GET"

        //store retrieved data inside an object called response
        }).done(function(response) {

        //Empty div that houses gifs so that new search will only display 
        //most recent search selection
        $("#gifs-appear-here").empty();
        
        // make a variable to hold data key set it equal to response.data
        var results = response.data 

        // ========================

        for (var i = 0; i < results.length; i++) {

        // Make a div with jQuery and store it in a variable named reactionDiv.
        var reactionDiv = $("<div class='imageDiv'>");//this is a newly created div not the one already created above

        var stillImg = results[i].images.fixed_width_still.url;
        var animateImg = results[i].images.fixed_width.url;
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        // Make an image tag with jQuery and store it in a variable named reactionImage.
        var reactionImage = $("<img>");

        // Set the image's src to results[i]'s fixed_height.url.
        reactionImage.attr("src", stillImg);
        reactionImage.attr("data-still", stillImg);
        reactionImage.attr("data-animate", animateImg);
        reactionImage.attr("data-state", "still");
        reactionImage.addClass("col-md-4 imageDiv");

        // Append the reactionImage variable to the reactionDiv variable.
        reactionDiv.prepend(reactionImage);

        // Prepend the reactionDiv variable to the element with an id of gifs-appear-here.
        $("#gifs-appear-here").prepend(reactionDiv);

        };
        $(".imageDiv").on("click", function() {
            var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                }
        });
       });//close button on click function
      })
  	};//close object response



$("#search-button").on("click", function() {
  $("#gifs-appear-here").empty();
    var newReaction = $("#topic-input").val().trim();
      if ($("#topic-input").val() !== "") {
        var addNewBtn = $("<button>").text(newReaction);
        addNewBtn.addClass("btn btn-primary");
        addNewBtn.attr("data-reaction", newReaction);
        // var newReaction = addUserBtn;
        $("#btn-section").prepend(addNewBtn);
        // (addNewBtn).appendTo("#btn-section");
      } else (alert("please add enter reaction"))
    console.log(addNewBtn);
    getReaction();
});  
 

});//close document ready
