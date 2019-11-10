//Requirements
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

//grabs variable from command line
let command = process.argv[2];
let userInput = process.argv.slice(3).join(" ");

//spotify search function
function songSearch(userInput) {

    //default if no input
    //console.log(userInput);
    if (userInput === "") {
        userInput = "The Sign Ace of Base";
    }

    spotify.search(
        {
            type: 'track',
            query: userInput
        }
    ).then(function (response) {
        const data = response.tracks.items[0];
        const dataBox = [];

        //console logs all song data
        dataBox.push("Song Title: " + data.name);
        dataBox.push("Artist(s): ");
        //this just outputs multiple artists separately
        for (let i = 0; i < data.artists.length; i++) {
            dataBox.push(data.artists[i].name);
        }
        dataBox.push("Preview: " + data.preview_url);
        dataBox.push("Album: " + data.album.name);
        
        //logs items in databox array to console and log.txt
        for (let i = 0; i < dataBox.length; i++) {
            console.log(dataBox[i]);
            
            fs.appendFile("log.txt", dataBox[i] + "\n", function (error) {

                if (error) {
                    console.log("error");
                };

            })

        }
    }).catch(function (error) {
        console.log(error);
    });

}

//concert search function
function concertSearch(userInput) {

    //default if no input
    if (userInput === "") {
        userInput = "Asheville+Symphony";
    }

    let queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function (response) {

        const concert = response.data[0];
        const dataBox = [];

        //if no data available
        if (typeof concert === "undefined") {
            return console.log("Looks like they're not playing anywhere...");
        }

        dataBox.push(concert.artist.name);
        dataBox.push("Venue: " + concert.venue.name);
        dataBox.push("Location: " + concert.venue.city + ", " + concert.venue.region + ", " + concert.venue.country);
        dataBox.push(moment(concert.datetime).format("MM/DD/YYYY LT"));

        //logs items in databox array to console and log.txt
        for (let i = 0; i < dataBox.length; i++) {
            console.log(dataBox[i]);
            
            fs.appendFile("log.txt", dataBox[i] + "\n", function (error) {

                if (error) {
                    console.log("error");
                };

            })

        }
    })

}

//omdb search function
function movieSearch(userInput) {

    //default if no input
    console.log(userInput)
    if (userInput === "") {
        userInput = "Mr.+Nobody";
    }

    let queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    //console.log(queryURL);

    axios.get(queryURL).then(function (response) {
        const movie = response.data;
        const dataBox = [];

        dataBox.push("Title: " + movie.Title);
        dataBox.push("Year: " + movie.Year);
        dataBox.push("imdb Rating: " + movie.imdbRating);

        //only logs rotten tomatoes rating if there is one
        if (movie.Ratings[1] !== undefined) {
            dataBox.push("Rotten Tomatoes: " + movie.Ratings[1].Value);
        }

        dataBox.push("Country: " + movie.Country);
        dataBox.push("Language: " + movie.Language);
        dataBox.push("Plot: " + movie.Plot);
        dataBox.push("Actors: " + movie.Actors);

        //logs items in databox array to console and log.txt
        for (let i = 0; i < dataBox.length; i++) {

            console.log(dataBox[i]);

            fs.appendFile("log.txt", dataBox[i] + "\n", function (error) {

                if (error) {
                    console.log("error");
                };

            })
        }

    }).catch(function (error) {
        console.log(error);
    });

}

//runs function from random.txt
function readRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            console.log(error);
        }

        data = data.split(",");

        command = data[0];
        //removes quotations
        userInput = data[1].replace(/["]/g, "");

        console.log(userInput)

        runLiri(command, userInput);

    })
}

//runs Liri commands
function runLiri(command, userInput) {
    switch (command) {
        case "spotify-this-song":
            songSearch(userInput);
            break;

        case "concert-this":
            concertSearch(userInput);
            break;

        case "movie-this":
            movieSearch(userInput);
            break;

        case "do-what-it-says":
            readRandom();
            break;
    }
};

runLiri(command, userInput);

