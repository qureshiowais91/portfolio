export const API = {
  REGISTER_USER: 'https://musicplayerapi.onrender.com/api/auth/register',
  LOGIN_USER: 'https://musicplayerapi.onrender.com/api/auth/login',
  GET_ALL_GENRES: 'https://musicplayerapi.onrender.com/api/genre/',
  CREATE_GENRE: 'https://musicplayerapi.onrender.com/api/genres',
  GET_ALL_SONGS: 'https://musicplayerapi.onrender.com/api/song',
  GET_SONG_BY_GENRE: 'https://musicplayerapi.onrender.com/api/song/listBygenre',
  GET_SONG_BY_ID: 'https://musicplayerapi.onrender.com/api/song/{id}',
  UPLOAD_SONG_FILE: 'https://musicplayerapi.onrender.com/api/song/uploadSongFile',
  UPLOAD_SONG_METADATA: 'https://musicplayerapi.onrender.com/api/song/uploadSongMetaData'
};


const localEndpoints = {
  REGISTER_USER: 'http://127.0.0.1:3000/api/auth/register',
  LOGIN_USER: 'http://127.0.0.1:3000/api/auth/login',
  GET_ALL_GENRES: 'http://127.0.0.1:3000/api/genres/',
  CREATE_GENRE: 'http://127.0.0.1:3000/api/genres',
  GET_ALL_SONGS: 'http://127.0.0.1:3000/api/song',
  GET_SONG_BY_ID: 'http://127.0.0.1:3000/api/song/{id}',
  UPLOAD_SONG_FILE: 'http://127.0.0.1:3000/api/song/uploadSongFile',
  UPLOAD_SONG_METADATA: 'http://127.0.0.1:3000/api/song/uploadSongMetaData',
};

// Example usage:
console.log(localEndpoints.REGISTER_USER); // Output: http://127.0.0.1:3000/api/auth/register
console.log(localEndpoints.GET_ALL_GENRES); // Output: http://127.0.0.1:3000/api/genres/
