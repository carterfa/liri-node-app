### LIRI Bot

## Overview

LIRI (or Language Interpretation and Recognition Interface) is a node console app that can search and return data on songs, concerts, and movies.

LIRI uses the following technologies:

  Packages:

  * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

  * [Axios](https://www.npmjs.com/package/axios)

  * [Moment](https://www.npmjs.com/package/moment)

  * [DotEnv](https://www.npmjs.com/package/dotenv)

  API:

  * [OMDB API](http://www.omdbapi.com) 

  * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

  * [Spotify API](https://developer.spotify.com/documentation/web-api/)

This app was created during Georgia Tech's Coding Boot Camp program in 2019.

[Given Instructions:](/homework_instructions.md)
  
## How to Use

1. Clone this repository and ensure the above packages are installed.

2. Create a `.env` file that includes your Spotify API keys in the following format:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
(You can get Spotify API keys by going to (https://developer.spotify.com/) and creating an app.)

3. Type in `node liri.js spotify-this-song` then a song title on the command line to have LIRI give the data on a specific song.

4. Type in `node liri.js concert-this` then a music artist name on the command line to have LIRI give location and dates for an artist's concerts.

5. Type in `node liri.js movie-this` then a movie title on the command line to have LIRI give data on a specific movie.

6. Type in `node liri.js do-what-it-says` to have LIRI perform the command in the `random.txt` file. Within the random.txt file, write the function that you want LIRI to perform followed by a comma. Then, with no extra space include your query inside of quotation marks.

  ex. movie-this,"Back to the Future"
  ex. concert-this,"Ariana Grande"
  ex. spotify-this-song,"I Want It That Way"

7. To view the data from all of your searches, open the `log.txt` file.
    
[Video Demonstration](https://drive.google.com/file/d/1yd2Bjn9KSL1-udKSWDzyWylPGjrR3Y9L/view)

