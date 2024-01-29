import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';

export const URLShortener = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const handleGenerateShortURL = () => {
    // You can implement the logic for generating a short URL here
    // For this example, let's just set a dummy short URL
    setShortURL('https://short.url/example');
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter Long URL"
            variant="outlined"
            value={longURL}
            onChange={(e) => setLongURL(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleGenerateShortURL}>
            Generate Short URL
          </Button>
        </Grid>
        {shortURL && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short URL"
              variant="outlined"
              value={shortURL}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

