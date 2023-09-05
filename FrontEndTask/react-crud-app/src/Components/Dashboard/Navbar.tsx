import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import { Grid } from '@mui/material';


import { CatchingPokemon } from '@mui/icons-material';
export const Navbar = () => {
  return (
    <div>
      <AppBar position='static' sx={{ p: 2 }}>
        <Grid container direction='row' lg={9}>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='logo'
            >
              <CatchingPokemon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              DashBoard
            </Typography>
          <Grid item >
          <Stack direction='row' spacing={3} >
              <Button color='inherit'>Home</Button>
              <Button color='inherit'>About Us</Button>
              <Button color='inherit'>Career</Button>
              <Button color='inherit'>Login</Button>
            </Stack>
          </Grid>
          
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
};
