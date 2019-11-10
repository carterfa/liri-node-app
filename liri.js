//Spotify requirements
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const title = process.argv.slice(3).join(" ");

switch (command) {
    case "spotify-this-song":
        songSearch(title);
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

function songSearch(title) {

    //default if no input
    if (title === "") {
        title = "The Sign Ace of Base";
    }

    spotify.search(
        {
            type: 'track',
            query: title
        }
    ).then(function (response) {
        let data = response.tracks.items[0];

        //console logs all song data
        //console.log(data);
        console.log("Artist(s): ");
        for (let i = 0; i < data.artists.length; i++) {
            console.log(data.artists[i].name);
        }
        console.log("Song Title: " + data.name);
        console.log("Preview: " + data.preview_url);
        console.log("Album: " + data.album.name);
    }).catch(function (error) {
        console.log(error);
    });

}