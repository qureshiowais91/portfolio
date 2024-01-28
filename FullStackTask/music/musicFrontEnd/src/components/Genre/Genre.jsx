// GenreTag.js
import React from 'react';
import Button from '@mui/material/Button';

const GenreTag = ({ genre }) => {
  const buttonStyle = {
    backgroundColor: 'transparent',
    borderRadius: '20px', // Adjust the radius to your preference
    color: '#000',
    margin:'2rem'
  };


  const handlerGenre = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  };

  return (
    <Button value={genre} onClick={handlerGenre} variant='contained' style={buttonStyle}>
      {genre}
    </Button>
  );
};

export default GenreTag;
