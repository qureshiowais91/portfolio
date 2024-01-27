// GenreTag.js
import React from 'react';
import Button from '@mui/material/Button';

const GenreTag = ({ genre }) => {
  const buttonStyle = {
    backgroundColor: 'transparent',
    borderRadius: '20px', // Adjust the radius to your preference
    border: '1px solid #fff', // Add border for better visibility
    color: '#000',
    margin:'2rem'
  };

  return (
    <Button variant='contained' style={buttonStyle}>
      {genre}
    </Button>
  );
};

export default GenreTag;
