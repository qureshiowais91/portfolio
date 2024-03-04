import { useState, useEffect } from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import { ListItem, ListItemText } from '@mui/material';
import { API } from '../../API/API';
import { setSong } from '../../features/controller/controllerSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const SongList = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [songs, setSongList] = useState([]);
  const dispatch = useDispatch();
  const selectedGenreIds = useSelector((state) => state.controller.genreID);

  useEffect(() => {
    (async () => {
      if (!selectedGenreIds) {
        const res = await fetch(`${API.GET_ALL_SONGS}`, {
          method: 'GET',
        });
        const songres = await res.json();
        setSongList(songres);
      } else {
        const res = await fetch(API.GET_SONG_BY_GENRE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Correct content type header
          },
          body: JSON.stringify({selectedGenreIds:selectedGenreIds}),
        });
        const songres = await res.json();
        setSongList(songres);
      }
    })();
  }, [selectedGenreIds]);

  const handlePlaySong = (song) => {
    dispatch(
      setSong({ url: song.songURL, name: song.name, album: song.album })
    );
    setCurrentlyPlaying(song.songURL);
    console.log(song);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {songs.map((song) => (
          <Grid item key={song._id} xs={12} md={6} lg={4}>
            <ListItem
              sx={{
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: '10%', // Make the button round
              }}
              onClick={() => handlePlaySong(song)}
            >
              {currentlyPlaying === song.songURL && (
                <IconButton
                  sx={{
                    borderRadius: '50%', // Make the button round
                    width: '50px', // Set a fixed width to ensure it's round
                    height: '50px', // Set a fixed height to ensure it's round
                    overflow: 'hidden', // Hide overflow to ensure it's round
                  }}
                >
                  <PlayArrowIcon fontSize='large' />
                </IconButton>
              )}
              <ListItemText>
                <Typography>{song.title}</Typography>
                <Typography>{song.album}</Typography>
                <Typography>{song.artist}</Typography>
                <Typography>{song.genre.name}</Typography>
              </ListItemText>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SongList;
