//console.log("This  liri.js file")
require('dotenv').config()
//Grab data from keys.js
const fs = require('fs');
const keys = require('./keys.js');
const request = require('request');
let Spotify = require('node-spotify-api');
const omdb = require('omdb');
const moment = require('moment');

var spotify = new Spotify({
    id: keys.spotifyKeys.client_ID,
    secret: keys.spotifyKeys.client_secret
});


const action = process.argv[2];
const parameter = process.argv.slice(3).join(" ");
let divider = "\n============================================================================================================\n\n";

// If no song is provided then your program will default to Rush Over Me by seven lions.
if (action === "movie-this") {
    let movieName = parameter;
    if (movieName == "") {
        movieName = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?i=tt3896198&apikey=3bc50c76&t=" + movieName, function (error, response, body) {

        let result = JSON.parse(body);
        if (!error && response.statusCode === 200) {
            console.log(error);

            let saveFile = [
                "Title :" + result.Title,
                "Year :" + result.Released,
                "IMDB Rating :" + result.imdbRating,
                "Rotten Tomatoes Rating :" + result.Ratings[1].Value,
                "Country :" + result.Country,
                "Language :" + result.Language,
                "Plot :" + result.Plot,
                "Actors :" + result.Actors,

            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", saveFile + divider, function (err) {
                if (err) throw err;
                console.log(saveFile);
            });
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
            let result = JSON.parse(body)[0];
            let newResult = [
                "Venue name " + result.venue.name,
                "Venue location " + result.venue.city,
                "Date of Event " + moment(result.datetime).format("MM/DD/YYYY")
            ].join("\n\n");
            fs.appendFile("log.txt", newResult + divider, function (err) {
                if (err) throw err;
                console.log(newResult);
            });
        }
    });


    // Name of the venueVenue location and Date of the Event by using moment js ( moment to format this as "MM/DD/YYYY")   
} else if (action === "spotify-this-song") {

    let songName = parameter;

    if (songName == "") {
        songName = "The Sign by Ace of Base.";
    }


    spotify.search({ type: "track", query: songName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        } else {
            let dataResult = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song: " + data.tracks.items[0].name,
                "Album: " + data.tracks.items[0].album.name,
                "Preview: " + data.tracks.items[0].preview_url
            ].join("\n\n");

            fs.appendFile("log.txt", dataResult + divider, function (err) {
                if (err) throw err;
                console.log(dataResult);
            });
        }
    });

} else if (action === "do-what-it-says") {
    fs.appendFile("log.txt", action + divider, function (err) {
        if (err) throw err;
    });
    console.log("do what it says");
}