import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {Typography} from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const Register = () => {
  return (
    <div>
    
      
          <FormGroup>
            <InputLabel>Email</InputLabel>
            <Input></Input>

            <InputLabel>Password</InputLabel>
            <Input></Input>
          </FormGroup>

          <Button sx={{m:2}} variant='contained'>Register</Button>
      
    </div>
  );
};
