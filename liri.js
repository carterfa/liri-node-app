//Spotify requirements
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

const command = process.argv[2];

switch (command) {
    case "spotify-this-song":
        console.log("spotifyme");
        break;

    case "concert-this":
        console.log("concerttime");
        break;

    case "movie-this":
        console.log("movie-search");
        break;

    case "do-what-it-says":
        console.log("doing it");
        break;
}