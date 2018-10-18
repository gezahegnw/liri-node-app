//console.log("This  liri.js file")
require('dotenv').config()
//Grab data from keys.js
const fs = require('fs');
const keys = require('./keys.js');
const request = require('request');
let  Spotify = require('node-spotify-api');
const omdb = require('omdb');
const moment = require('moment');

var spotify = new Spotify({
    id: keys.spotifyKeys.client_ID,
    secret: keys.spotifyKeys.client_secret
  });

const chalk = require('chalk');

const action = process.argv[2];
const parameter = process.argv.slice(3).join(" ");
const log = console.log;


// If no song is provided then your program will default to Rush Over Me by seven lions.
 if ( action === "movie-this") {
    let movieName = parameter;

    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    } 

    request("http://www.omdbapi.com/?i=tt3896198&apikey=3bc50c76&t=" + parameter, function (error, response, body) {
        
        let result  =  JSON.parse(body);
    if (!error && response.statusCode === 200) {
        console.log(error);
   log(chalk.red("\n==================================================================================================================================================\n"));
   log(chalk.green("Title :") + result.Title);
   log(chalk.green("Year :")+ result.Released);
   log(chalk.green("IMDB Rating :") + result.imdbRating );
   log(chalk.green("Rotten Tomatoes Rating :") + result.Ratings[1].Value);
   log(chalk.green("Country :") +  result.Country);
   log(chalk.green("Language :") + result.Language);
   log(chalk.green("Plot :") + result.Plot);
   log(chalk.green("Actors :") +  result.Actors);
   log(chalk.red("\n====================================================================================================================================================\n"));
    } 

});

 }
  else if (action === "concert-this") {
   
    let artist = parameter;
    console.log(artist);
   
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=bandsInTownKey"; 

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(error);
        let result  =  JSON.parse(body)[0];
        log(chalk.yellow("\n==================================================================================================================================================\n"));
        log(chalk.blue("Venue name ") + result.venue.name);
        log(chalk.blue("Venue location ") + result.venue.city);
        log(chalk.blue("Date of Event ") +  moment(result.datetime).format("MM/DD/YYYY"));
        log(chalk.yellow("\n==================================================================================================================================================\n"));
         } 
 });


    // Name of the venueVenue location and Date of the Event by using moment js ( moment to format this as "MM/DD/YYYY")   
} else if ( action === "spotify-this-song") {

    let songName = parameter;

    if (songName === undefined) {
        songName = "The Sign by Ace of Base.";
    } 
   

     spotify.search({ type: "track", query: songName, limit: 1  }, function(err, data) {
            if (err) {
            return console.log("Error occurred: " + err);
            }else {
        
            log(chalk.green("\n======================================================================================================================================\n"));
            log(chalk.red("Artist: ") + data.tracks.items[0].artists[0].name);
            log(chalk.red("Song: ") + data.tracks.items[0].name);
            log(chalk.red("Preview: ") + data.tracks.items[0].preview_url);
            log(chalk.red("Album: ") + data.tracks.items[0].album.name);
            log(chalk.green("\n======================================================================================================================================\n"));
        
        }
    });

     } else if ( action === "do-what-it-says") {
        log(chalk.blue("\n==================================================================================================================================================\n"));
        log(chalk.green("do what it says"));
        log(chalk.blue("\n==================================================================================================================================================\n"));
    }