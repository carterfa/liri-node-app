//Requirements
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var seatGeekKey = keys.seatgeek.id;

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


        //this just outputs multiple artists separately
        let artistNames = data.artists[0].name;
        if (data.artists.length > 1) {
            for (let i = 1; i < data.artists.length; i++) {
                artistNames += ", " + data.artists[i].name;
            }
        }

        //console logs all song data
        const songData =
`Song Title: ${data.name}
Artists: ${artistNames}
Preview: ${data.preview_url}
Album: ${data.album.name}
---------------`

        console.log(songData);

        //logs items to log.txt

        fs.appendFile("log.txt", "\n" + songData, function (error) {

            if (error) {
                console.log("error");
            };

        })


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

    let queryURL = "https://api.seatgeek.com/2/events?q=" + userInput + "&client_id=" + seatGeekKey;

    axios.get(queryURL).then(function (response) {

        const concert = response.data.events[0];

        //console.log(concert);

        //if no data available
        if (typeof concert === "undefined") {
            return console.log("Looks like they're not playing anywhere...");
        }

        const concertData =
`Title: ${concert.title}
Venue: ${concert.venue.name}
Location:  ${concert.venue.extended_address}
Date: ${moment(concert.datetime_local).format("MM/DD/YYYY LT")}
---------------`

        console.log(concertData);

        //logs items to log.txt
        fs.appendFile("log.txt", "\n" + concertData, function (error) {

            if (error) {
                console.log("error");
            };

        })


    }).catch(function (error) {
        console.log(error);
    });


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

        //only logs rotten tomatoes rating if there is one
        let rt = "";
        if (movie.Ratings !== undefined) {
            if (movie.Ratings[1] !== undefined) {
                rt = movie.Ratings[1].Value;
            }
        }

        const movieData =
`Title: ${movie.Title}
Year: ${movie.Year}
imdb Rating: ${movie.imdbRating}
Rotten Tomatoes Rating: ${rt}
Country: ${movie.Country}
Language: ${movie.Language}
Plot: ${movie.Plot}
Actors ${movie.Actors}
---------------`

        console.log(movieData);

        //logs items to log.txt
        fs.appendFile("log.txt", "\n" + movieData, function (error) {

            if (error) {
                console.log("error");
            };

        })

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

