require("dotenv").config();

// var twitterClient = new Twitter(keys.twitter)
// var spotify = new Spotify(keys.spotify)


// var keys = require('./keys.js')
// var Twitter = require('twitter')
// var Spotify = require('node-spotify-api')
// var request = require('request')
// var fs = require('fs')



//require twitter npm
var twitter = require("twitter");
//require request npm
var request = require("request");
//require spotify npm
var spotify = require("spotify");
//require fs npm
var fs = require("fs");

//require keys file with twitter info
var getTwitterKeys = require("./keys");

//make variable for user-entered search term and command
var searchTerm = process.argv[3];
var doThis = process.argv[2];

//variables for searches
var movieQueryURL;
var songQueryUrl;

//pull in twitter API keys
var getMyTweets = new twitter({
	consumer_key: getTwitterKeys.twitterKeys.consumer_key,
  	consumer_secret: getTwitterKeys.twitterKeys.consumer_secret,
  	access_token_key: getTwitterKeys.twitterKeys.access_token_key,
  	access_token_secret: getTwitterKeys.twitterKeys.access_token_secret
});

if (doThis === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(err,data) {

		var output = data.split(",");

		doThis = output[0];
		searchTerm = output[1];
		doTheThing();
	});
}
else {
	doTheThing();
}

function doTheThing() {
	switch(doThis) {
		case "my-tweets": twitterFunc();
			break;
		case "movie-this": omdbFunc();
			break;
		case "spotify-this-song": spotifyFunc();
			break;
	};
}

//if user passes my-tweets parameter
function twitterFunc() {

	//find my twitter handle and put in a variable
	var params = {screen_name: "the_millest"};
		
	//access object with twitter keys and get entries from timeline
	getMyTweets.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {
		//loop through response and pull only two pieces of info. stop at 20.
			for (var t = 0; t < 20; t++) {
				console.log("");
			  	console.log(tweets[t].created_at);
			  	console.log(tweets[t].text);
			}
		}
	});
};

//if user passes movie-this parameter
function omdbFunc() {

	//if there is no index 3, sub in this query
	if (!searchTerm) {
		searchTerm = "Mr. Nobody";
	}

	//add search term to url; specify url should return tomatoes info
	movieQueryURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&tomatoes=true&r=json";

	request(movieQueryURL, function(error, response, body) {
		if (!error && response.statusCode === 200) {

			//console.log(body);
			console.log("Movie title: " + JSON.parse(body)["Title"]);
			console.log("Release year: " + JSON.parse(body)["Year"]);
			console.log("IMDB rating: " + JSON.parse(body)["imdbRating"]);
			console.log("Produced in: " + JSON.parse(body)["Country"]);
			console.log("Language: " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Actors: " + JSON.parse(body)["Actors"]);
			console.log("Rotten Tomatoes rating: " + JSON.parse(body)["tomatoRating"]);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
		}
	});
};

function spotifyFunc() {

	if (!searchTerm) {
		
		searchTerm = "Ace of Base - The Sign";
	}

	songQueryUrl = "https://api.spotify.com/v1/search?query=" + searchTerm + "&offset=20&limit=20&type=track";

	spotify.get(songQueryUrl, function(err, data) {
    if (err) {
        console.log(err);
    }
 	else {
 		for (var i = 0; i < data.tracks.items.length; i++) {
	 			
 				for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
	 				console.log("");
	 				console.log("Artist: " + data.tracks.items[i].artists[j].name);
	 			}
	 			console.log("Song name: " + data.tracks.items[i].name);
	 			console.log("Album: " + data.tracks.items[i].album.name);
				console.log("Preview URL: " + data.tracks.items[i].preview_url);
 		}
	 	//console.log(data);
	 	//console.log(songQueryUrl);	
	}
	});
};
