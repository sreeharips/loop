import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { LoopContext } from '../context/LoopContext';
import { useNavigate } from 'react-router-dom';

 

 
export default  function LoopLogin() {
    const navigate = useNavigate();


  const[progress,setProgress] = React.useState(false);
  const {login,setAuth,initApp} = React.useContext(LoopContext);
  const [alertMessage,setAlertMessage] = React.useState(null);
  const handleSubmit = async(event) => {
    event.preventDefault();
    setAlertMessage(null);
    const data = new FormData(event.currentTarget);
    if(!data.get('user') || !data.get('password')){
        setAlertMessage("Please enter valid user id/ password");
        return;
    }
    setProgress(true);
   
    const response = await login(data.get('user'),data.get('password'));
    console.log('response from server:::',response.status);
    if(response.status === 'ERROR'){
        setAlertMessage(response.msg);
    }else{

        setAuth(response.id);
        initApp();
        navigate("/home");
    }
    setProgress(false);
     
  };

  return (
       <Container component="main" maxWidth="xs">
         <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src="/loopkitchen.jpeg">
             
          </Avatar>
          <Typography component="h1" variant="h5">
          Loop Kitchen
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {alertMessage && 
             <Alert severity="error">{alertMessage}</Alert>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="User Id"
              name="user"
              
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              
            />
            
            {progress && <CircularProgress />}
            {!progress &&
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{color:"white"}}
            >
              Sign In
            </Button>
            }
            
          </Box>
        </Box>
         
      </Container>
   );
}