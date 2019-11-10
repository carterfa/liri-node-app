//Requirements
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

//grabs variables from command line
const command = process.argv[2];


function songSearch() {

    let title = process.argv.slice(3).join(" ");

    //default if no input
    console.log(title);
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

function concertSearch() {

    let title = process.argv.slice(3).join("+");

    //default if no input
    if (title === "") {
        title = "Asheville+Symphony";
    }

    let queryURL = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(function (response) {

        const concert = response.data[0];

        //if no data available
        if (typeof concert === "undefined"){
            return console.log("Looks like they're not playing anywhere...");
        }

        //console.log(concert);
        console.log("Venue: " + concert.venue.name);
        console.log("Location: " + concert.venue.city + ", " + concert.venue.region + ", " + concert.venue.country);
        console.log(moment (concert.datetime).format("MM/DD/YYYY LT"));
    })

}

function movieSearch() {

    let title = process.argv.slice(3).join("+");

    //default if no input
    console.log(title)
    if (title === "") {
        title = "Mr.+Nobody";
    }

    let queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    //console.log(queryURL);

    axios.get(queryURL).then(function (response) {
        const movie = response.data;

        console.log("Title: " + movie.Title);
        console.log("Year: " + movie.Year);
        console.log("imdb Rating: " + movie.imdbRating);

        //only logs rotten tomatoes rating if there is one
        if (movie.Ratings[1] !== undefined) {
            console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
        }

        console.log("Country: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);

    }).catch(function (error) {
        console.log(error);
    });

}

switch (command) {
    case "spotify-this-song":
        songSearch();
        break;

    case "concert-this":
        concertSearch();
        break;

    case "movie-this":
        movieSearch();
        break;

    case "do-what-it-says":
        console.log("doing it");
        break;
}