console.log('this is loaded');

exports.twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  };
  
  exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };
  

// exports.twitter = {
//   consumer_key: wFic3H4U3DmCSKaxj3XMzIIy8,
//   consumer_secret: QQGhA7MuXClcAzLb3N1sDOMJytGCTluTNoTyVCZifZ8mmNuZ62,
//   access_token_key: 988588054947532800-7ue6dkLF3WYB7ZdydA1E9jEpKs2D0C5,
//   access_token_secret: nAJxiri6K4PDy6RBHU6CaTlhmAONgo1lImUmE5o8uP946
// };

// exports.spotify = {
//   id: 1f7ed15402b3452680bef6c8bc0b6311,
//   secret: d2562a5091d5488fa1ea9408889b6326
// };
