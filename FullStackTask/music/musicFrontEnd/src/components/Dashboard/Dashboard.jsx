import { useState, useEffect } from 'react';
import { Container, Paper, Grid } from '@mui/material';
import MusicPlayer from '../Player/Player';
import SongList from '../SongList/SongList';
// import GenreTag from '../Genre/Genre';
import Divider from '@mui/material/Divider';
import { API } from '../../API/API';

const Dashboard = () => {
  const [genress, setGenres] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API.GET_ALL_GENRES}`, {
        method: 'GET',
      });

      const Genre = await res.json();
      console.log(Genre);
      setGenres()
      console.log(genress)
    })();
  }, []);

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
         
        </Grid>
        <Grid item xs={5}>
          <SongList></SongList>
        </Grid>
        <Grid item xs={2}>
          <Divider orientation='vertical' />
        </Grid>
        <Grid item xs={5}>
          <Paper>
            <MusicPlayer />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
