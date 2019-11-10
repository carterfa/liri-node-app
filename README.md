### LIRI Bot

## Overview

LIRI (or Language Interpretation and Recognition Interface) is a node console app that can search and return data on songs, concerts, and movies.

LIRI uses the following technologies:

  * [Node](https://node.js.org/)

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

# Setup

1. Clone this repository and ensure the above packages are installed.

2. Create a `.env` file that includes your Spotify API keys in the following format:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
(You can get Spotify API keys by going to (https://developer.spotify.com/) and creating an app.)

