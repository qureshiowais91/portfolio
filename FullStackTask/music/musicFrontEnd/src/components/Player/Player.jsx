import  { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Slider,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playedTime, setPlayedTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  // Simulating audio duration for demonstration purposes
  const audioDuration = 240; // 4 minutes

  useEffect(() => {
    setEndTime(audioDuration);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && progress < audioDuration) {
        setProgress((prevProgress) => prevProgress + 1);
        setPlayedTime((prevPlayedTime) => prevPlayedTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, progress, audioDuration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipNext = () => {
    // Add logic to skip to the next track
  };

  const handleSkipPrevious = () => {
    // Add logic to skip to the previous track
  };

  const handleSliderChange = (event, newValue) => {
    setProgress(newValue);
    setPlayedTime(newValue);
    // Add logic to update audio playback progress
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <div className='music-player-container'>
      <div className='overlay'>
        {/* Your content with album name, song name, and image */}
        <img
          src='./test.jpeg'
          alt='Album Cover'
          width='150rem'
          className='album-cover'
        />
        <Typography variant='h4' className='album-name'>
          Album Name
        </Typography>
        <Typography variant='h2' className='song-name'>
          Song Name
        </Typography>
      </div>

      {/* Music player controls */}
      <Card className='music-controls'>
        <CardContent>
          <Stack direction='row' spacing={3}>
            <Typography variant='body2'>{formatTime(playedTime)}</Typography>
            <Slider
              value={progress}
              onChange={handleSliderChange}
              aria-labelledby='continuous-slider'
              className='progress-slider'
              max={audioDuration}
            />
            <Typography variant='body2'>{formatTime(endTime)}</Typography>
          </Stack>
          <div className='control-buttons'>
            <IconButton onClick={handleSkipPrevious} disabled={!isPlaying}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={handleSkipNext} disabled={!isPlaying}>
              <SkipNextIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicPlayer;
