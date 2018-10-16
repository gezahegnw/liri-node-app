//console.log("This  liri.js file")
require('dotenv').config()
//Grab data from keys.js
const fs = require('fs');
const keys = require('./keys.js');
const request = require('request');
let  spotify = require('node-spotify-api');
const omdb = require('omdb');
//const bandsintown = require('bandsintown');//( bandsInTownKey);
//const bandsintown = require('bandsintown')("codingbootcamp");
const moment = require('moment');
//let spotify = new Spotify(keys.spotify);

const cTable = require('console.table')
const chalk = require('chalk');

const action = process.argv[2];
const parameter = process.argv.slice(3).join(" ");
const log = console.log;


// If no song is provided then your program will default to Rush Over Me by seven lions.
/* if ( action === "movie-this") {
    let movieName = parameter;;

    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    } 

    request("http://www.omdbapi.com/?i=tt3896198&apikey=3bc50c76&t=" + parameter, function (error, response, body) {
        
        let result  =  JSON.parse(body);
    if (!error && response.statusCode === 200) {
        console.log(error);
   
   log(chalk.red("\n=========================================\n"));
   log(chalk.red("Title :") + result.Title);
   log(chalk.red("Year :")+ result.Released);
   log(chalk.red("IMDB Rating :") + result.imdbRating );
   log(chalk.red("Rotten Tomatoes Rating :") + result.Ratings[1]);//.Value;
   log(chalk.red("Country :") +  result.Country);
   log(chalk.red("Language :") + result.Language);
   log(chalk.red("Plot :") + result.Plot);
   log(chalk.red("Actors :") +  result.Actors);
   log(chalk.red("\n=====================================================\n"));
    } 

});


} */
  if (action === "concert-this") {
   
    let artist = parameter;
    console.log(artist);
   
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=bandsInTownKey"; 

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(error);
        let result  =  JSON.parse(body)[0];
        log(chalk.blue("\n=====================================================\n"));
        log(chalk.blue("Venue name ") + result.venue.name);
        log(chalk.blue("Venue location ") + result.venue.city);
        log(chalk.blue("Date of Event ") +  moment(result.datetime).format("MM/DD/YYYY"));
        log(chalk.blue("\n=====================================================\n"));
         } 
 });


    // Name of the venueVenue location and Date of the Event by using moment js ( moment to format this as "MM/DD/YYYY")   
} else if ( action === "spotify-this-song") {

    let songName = parameter;

    if (songName === undefined) {
        songName = "Rush Over Me by seven lions";
    } 
   

     spotify.search({ type: "track", query: songName, limit: 1  }, function(err, data) {
            if (err) {
            return console.log("Error occurred: " + err);
            }

            let tableArray = [];

            for (let i = 0; i < data.tracks.items.length; i++ ) {
                let result = {
                    artist : data.tracks.items[i].album.artists[0].name,
                    album_name : data.tracks.items[i].album.name,
                    song_name : data.tracks.items[i].name,
                    preview_url : data.tracks.items[i].preview_url 
                }
                tableArray.push(result);
            }
      
            
            let tableResult = cTable.getTable(tableArray);
    
            console.log(tableResult);

       
    });

    
} else if ( action === "do-what-it-says") {
    console.log("do what it says")
}