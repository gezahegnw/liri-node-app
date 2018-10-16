//console.log("This  liri.js file")
require('dotenv').config()
//Grab data from keys.js
const fs = require('fs');
const keys = require('./keys.js');
const request = require('request');
const spotify = require('node-spotify-api');
const omdb = require('omdb');
const bandsintown = require('bandsintown'); //+ bandsInTownKey;
const moment = require('moment');

const action = process.argv[2];
const parameter = process.argv.slice(3).join(" ");



if (action === 'concert-this' ) {
   
    let artist = parameter;
    console.log(artist);
   
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=bandsInTownKey"; //+ bandsintown;

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        let result  =  JSON.parse(body)[0];
        console.log("\n=====================================================\n");
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
        console.log("\n=====================================================\n");

 });


    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")   
} else if ( action === 'spotify-this-song') {

    let songName = parameter;;

    if (songName === undefined) {
        songName = "The sign by Ace of Base";
    } 
   

     spotify.search({ type: 'track', query: songName, limit: 10  }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
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
      
            
            let table = cTable.getTable(tableArray);
    
            console.log(table);

       
    });

// If no song is provided then your program will default to "The Sign" by Ace of Base.
} else if ( action === 'movie-this') {
    let movieName = parameter;;

    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    } 

    request('http://www.omdbapi.com/?i=tt3896198&apikey=3bc50c76&t=' + parameter, function (error, response, body) {
        
        let result  =  JSON.parse(body);
   // if (!err && res.statusCode === 200) {
        console.log("\n=========================================\n");
        console.log("Title :" + result.Title);
        console.log("Year :" + result.Released);
        console.log("IMDB Rating :" + result.imdbRating );
        console.log("Rotten Tomatoes Rating :" + result.Ratings[1]);//.Value);
        console.log("Country :" +  result.Country);
        console.log("Language :" + result.Language);
        console.log("Plot :" + result.Plot);
        console.log("Actors :" +  result.Actors);
        console.log("\n=====================================================\n");

   // }

    });

} else if ( action === 'do-what-it-says') {
    console.log('do what it says')
}
