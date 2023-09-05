import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const Login = () => {
  return (
    <div>
     
          <FormGroup>
            <InputLabel>Email</InputLabel>
            <Input></Input>

            <InputLabel>Password</InputLabel>
            <Input></Input>
          </FormGroup>

          <Button sx={{m:2}} variant='contained'>Login</Button>
       
      
    </div>
  );
};
