/* eslint-disable react/prop-types */
// GenreTag.js
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setGenre,removeGenre } from '../../features/controller/controllerSlice';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
const GenreTag = ({ id, name }) => {
  const dispatch = useDispatch();
  const genreSelectedID = useSelector((state) => state.controller.genreID);
  // const buttonStyle = {
  //   backgroundColor: 'transparent',
  //   borderRadius: '20px', // Adjust the radius to your preference
  //   color: '#000',
  //   margin: '2rem',
  // };
  console.log(genreSelectedID, 'test');
  const handlerGenre = (e) => {
    e.preventDefault();
    dispatch(setGenre({ genreID: id }));
  };

  const removeGenreHandler = (id) => {
    console.log(id);
    dispatch(removeGenre({ genreID: id }));
  };

  return (
    <div>
      <Button value={id} onClick={handlerGenre}>
        {name}
      </Button>
      <div>
        {genreSelectedID.includes(id) && (
          <Button  onClick={() => removeGenreHandler(id)}>
            <RemoveCircleOutlineSharpIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default GenreTag;
