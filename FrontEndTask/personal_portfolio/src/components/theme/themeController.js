import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { lightTheme } from './ligthTheme';
import { darkTheme } from './darkTheme';


export const ThemeController = (prop) => {
  const settheme = prop.setTheme;
  const theme = prop.theme;
  function toggleTheme() {
    settheme((prevtheme) => {
      return prevtheme === darkTheme ? lightTheme : darkTheme;
    });
    console.log(theme);
  }

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          label='Switch Dark Mode'
          control={
            <Switch
              id='theme-switch'
              checked={theme === darkTheme}
              onChange={toggleTheme}
            />
          }
        />
      </FormGroup>
    </div>
  );
};
