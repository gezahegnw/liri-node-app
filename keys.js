console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// Spotify api keys
const spotifyKeys = {
    client_ID: "8387a67d5c5e4d47b12a3237f47da371",
    client_secret: "dc4b24ef911941aca309de6a30db799c"
    
  }
  // OMDB api key
const omdbKey = "3bc50c76";
//bandsintwon api key
//const bandsInTownKey= bd080d4d6b0498546f5f5eb209ca0575;


module.exports.spotifyKeys = spotifyKeys;
module.exports.omdbKey = omdbKey;
//module.exports.bandsInTownKey = bandsInTownKey;
