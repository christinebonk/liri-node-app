//Require
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

//Variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var userinput = process.argv[2];
var title = process.argv[3];

//main function
function liri(userinput,title) {
		switch(userinput) {
		case `my-tweets`:
			client.get('https://api.twitter.com/1.1/statuses/home_timeline.json?count=20', function(error, tweets, response) {
	  			if(error) throw error;
				for (i = 0; i < tweets.length; i++) {
				  	console.log(tweets[i].text);
				  	console.log("- " + tweets[i].created_at);
				  	console.log("☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆")
	  			}
			});
			break;
		case `spotify-this-song`: 
			if(title) {
				spotifySearch(title);
			} else {
				spotifySearch("The Sign Ace of Base")
			}
		break;
		case `movie-this`:
			if(title) {
				omdbSearch(title);
			} else {
				omdbSearch("Mr Nobody");
			}
		break;
		case `do-what-it-says`:
			fs.readFile("random.txt", "utf8", function(error,data) {
				if(error) {
					return console.log(error);
				};
				var dataArray = data.split(",")
				var command = dataArray[0];
				var input = dataArray[1];
				liri(command,input);
			});
		break;	
	}
}

//function call
liri(userinput,title);

//functions
function spotifySearch(x) {
	spotify.search({ type: 'track', query: x, limit: 1 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	  	console.log("☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆")
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
		console.log("Song: " + data.tracks.items[0].name); 
		console.log("Album: " + data.tracks.items[0].album.name); 
		console.log("Song Preview: " + data.tracks.items[0].preview_url); 
		console.log("☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆")
	});
}

function omdbSearch(x) {
	var queryUrl = "http://www.omdbapi.com/?t=" + x + "&y=&plot=short&apikey=trilogy";
	request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆")
	   	 		console.log("Year: " + JSON.parse(body).Year);
	   	 		console.log("Title: " + JSON.parse(body).Title);
	   	 		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	   	 		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	   	 		console.log("Country: " + JSON.parse(body).Country);
	   	 		console.log("Language: " + JSON.parse(body).Language);
	   	 		console.log("Plot: " + JSON.parse(body).Plot);
	   	 		console.log("Actors: " + JSON.parse(body).Actors);
	   	 		console.log("☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆")
	  		}
	});
}



 
