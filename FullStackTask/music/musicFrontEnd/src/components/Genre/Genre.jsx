/* eslint-disable react/prop-types */
// GenreTag.js
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setGenre } from '../../features/controller/controllerSlice';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
const GenreTag = ({ id, name }) => {
  const dispatch = useDispatch();
  const genreSelectedID = useSelector((state) => state.controller.genreID);
  console.log(genreSelectedID);
  // const buttonStyle = {
  //   backgroundColor: 'transparent',
  //   borderRadius: '20px', // Adjust the radius to your preference
  //   color: '#000',
  //   margin: '2rem',
  // };

  const handlerGenre = (e) => {
    e.preventDefault();
    dispatch(setGenre({ genreID: id }));
  };

  return (
    <div>
      <Button value={id} onClick={handlerGenre}>
        {name}
      </Button>
      <Button>
        <RemoveCircleOutlineSharpIcon />
      </Button>
    </div>
  );
};

export default GenreTag;
