import { useEffect, useRef, useState } from 'react';
import { Card, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
const MusicPlayer = () => {
  const url = useSelector((state) => state.controller.url);
  const name = useSelector((state) => state.controller.name);
  const album = useSelector((state) => state.controller.album);
  const audioRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    audioRef.current.src = url;
    audioRef.current.play();

    const handleScroll = () => {
      if (window.scrollBy > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [url]);

  return (
    <div className='music-player-container'>
      <Card className={`${isScrolled ? ' scrolled' : ''}`}>
        <Box sx={{ alignContent: 'center' }}>
          <div className='overlay'>
            <Typography variant='h4' className='album-name'>
              {album}
            </Typography>
            <Typography variant='h2' className='song-name'>
              {name}
            </Typography>
          </div>
          <audio controls ref={audioRef}>
            <source src={url} type='audio/mpeg' />
          </audio>
        </Box>
      </Card>
    </div>
  );
};

export default MusicPlayer;
