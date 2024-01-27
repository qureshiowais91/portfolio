import React, { useState } from 'react';
import { Card, CardContent, Grid, IconButton, Typography, Slider, Stack } from '@mui/material';

const SongList = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const songs = [
    {
      id: 1,
      title: 'Song 1',
      banner: './test.jpeg',
    },
    {
      id: 2,
      title: 'Song 2',
      banner: './test.jpeg',
    },
    {
      id: 3,
      title: 'Song 3',
      banner: './test.jpeg',
    },
    {
      id: 3,
      title: 'Song 3',
      banner: './test.jpeg',
    },
    {
      id: 3,
      title: 'Song 3',
      banner: './test.jpeg',
    },  {
      id: 3,
      title: 'Song 3',
      banner: './test.jpeg',
    },  {
      id: 3,
      title: 'Song 3',
      banner: './test.jpeg',
    },
    // Add more songs as needed
  ];

  const handlePlaySong = (song) => {
    setCurrentlyPlaying(song);
    // Add logic to play the selected song
  };

  return (
    <div>
      <Grid container spacing={3}>
        {songs.map((song) => (
          <Grid item key={song.id} xs={3}>
            <Card>
              <img
                src={song.banner}
                alt={`Banner for ${song.title}`}
                style={{ width: '100%', height: '150px', cursor: 'pointer' }}
                onClick={() => handlePlaySong(song)}
              />
              <CardContent>
                <Typography variant="h5" onClick={() => handlePlaySong(song)}>
                  {song.title}
                </Typography>
                <Typography variant="body2">{`Song ID: ${song.id}`}</Typography>
                {currentlyPlaying && currentlyPlaying.id === song.id && (
                  <Typography variant="body2">Currently Playing</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SongList;
