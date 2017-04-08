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

//  var gifHome = $('gifs-appear-here');

$("button").on("click", function() {
      var reactions = $(this).attr("data-reaction");

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
        
        // make a variable ot hold data key set it equal to response.data
        var results = response.data 

        // ========================

        for (var i = 0; i < results.length; i++) {

        // Make a div with jQuery and store it in a variable named reactionDiv.
        var reactionDiv = $("<div>");//this is a newly created div not the one already created above

        // Make an image tag with jQuery and store it in a variable named reactionImage.
        var reactionImage = $("<img>");

        // Set the image's src to results[i]'s fixed_height.url.
        reactionImage.attr("src", results[i].images.fixed_height.url);

        // Append the reactionImage variable to the reactionDiv variable.
        reactionDiv.prepend(reactionImage);

        // Prepend the reactionDiv variable to the element with an id of gifs-appear-here.
        $("#gifs-appear-here").prepend(reactionDiv);

        };
       });//close button on click function
  	});//close object response

$("#search-button").on("click", function() {
  //Empty div that houses gifs so that new search will only display 
  //most recent search selection
  $("#gifs-appear-here").empty();
  var addUserBtn = $("input[id=add-topic]").val();
	// var newbtn = $("<button>");
  $("#btn-section").append("<button>" + addUserBtn + "</button>");
 
	// $("#btn-section").append(newbtn);
});

		// if ($('#topic-input').val() !== "") {
  //       renderButtons();
  //       

});//close document ready
