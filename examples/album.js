/* to run: babel-node albums.js */
global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const TOKEN_API = 'BQAs_5LBZ77Qf9rcTAzDJgJE5JDIsunn7l-QSWtJi-rFfO4NzKyJG86CRH8_XeiZu7zPGOzInij2yYTidYbcNZ_Xr5-LLbAD434xe3TG1xSUgtmVQerLllzrFQ56y1yCsvJyWgJbvyam';
const spotify = new SpotifyWrapper({
  token: TOKEN_API,
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
