import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import MusicPlayer from '../Player/Player';
import SongList from '../SongList/SongList';
import GenreTag from '../Genre/Genre';
import { API } from '../../API/API';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [genress, setGenres] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);


  useEffect(() => {
    (async () => {
      const res = await fetch(`${API.GET_ALL_GENRES}`, {
        method: 'GET',
      });

      const Genre = await res.json();
      setGenres(Genre['genres']);
    })();
  }, []);

  return (
   
<Container>
  <Grid container >
    {/* Left section for genres */}
    <Grid item xs={3}> {/* Adjust the width as needed */}
      <Grid container direction="column" spacing={3}>
        {genress.map((genre) => (
          <Grid item key={genre._id}>
            <GenreTag id={genre._id} name={genre.name} />
          </Grid>
        ))}
      </Grid>
    </Grid>
    {/* Middle section for songs */}
    <Grid item xs={9}> {/* Adjust the width as needed */}
      <SongList />
    </Grid>
    {/* Bottom section for music player */}
    <Grid item xs={10} sx={{ margin: '0 auto', position: 'fixed', bottom: 0, width: '80%' }}>
      <MusicPlayer />
    </Grid>
  </Grid>
</Container>
  );
};

export default Dashboard;
