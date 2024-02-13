import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { API } from '../../API';
import { getJWTToken } from '../../util/authUtils';

export const URLShortener = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURl] = useState('');

  const shortLongurl = async (token) => {
    console.log(JSON.stringify({ longURL: longURL }));

    const shURL = await fetch(`${API.URL_URL}/create-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ longURL: longURL }),
    });
    const rep = await shURL.json();
    setShortURl(rep['urlData']['shortURL']);
  };

  const handleGenerateShortURL = () => {
    (async () => {
      const token = getJWTToken();
      console.log(token);
      await shortLongurl(token);
    })();
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Enter Long URL'
            variant='outlined'
            value={longURL}
            onChange={(e) => setLongURL(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleGenerateShortURL}
          >
            Generate Short URL
          </Button>
        </Grid>
        {true && (
          <Grid item xs={12}>
            <TextField
              fullWidth
                variant='outlined'
              value={shortURL}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
