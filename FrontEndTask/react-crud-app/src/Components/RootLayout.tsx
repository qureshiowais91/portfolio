import { useNavigate, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

export const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Grid
        container
        justifyContent='center'
        sx={{ m: 2 }}
        alignItems='center'
        spacing={2}
      >
        <Grid item lg={3}>
          <Button onClick={() => navigate('login')}>Login</Button>
          <Button onClick={() => navigate('register')}>Register</Button>
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </div>
  );
};
