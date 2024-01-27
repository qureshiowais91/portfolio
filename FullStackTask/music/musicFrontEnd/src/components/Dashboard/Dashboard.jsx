import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import MusicPlayer from '../Player/Player';
import SongList from '../SongList/SongList';
import GenreTag from '../Genre/Genre';

const Dashboard = () => {
  const genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Pop' },
    { id: 3, name: 'Jazz' },
    { id: 4, name: 'Hip Hop' },
    { id: 5, name: 'Country' },
    { id: 6, name: 'Electronic' },
    { id: 7, name: 'Blues' },
    { id: 8, name: 'Reggae' },
    { id: 9, name: 'Classical' },
    { id: 10, name: 'R&B' },
    { id: 11, name: 'Funk' },
    { id: 12, name: 'Indie' },
    { id: 13, name: 'Metal' },
    { id: 14, name: 'Alternative' },
    { id: 15, name: 'Soul' },
  ];
  
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {genres.map((genre) => (
            <GenreTag key={genre.id} genre={genre.name} />
          ))}
        </Grid>

        <Grid item xs={6}>
          <SongList></SongList>
        </Grid>

        <Grid item xs={6}>
          <Paper>
            <MusicPlayer />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
