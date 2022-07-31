import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MenuItems } from './MenuItems';
import { LoopContext } from '../context/LoopContext';
import CircularProgress from '@mui/material/CircularProgress';
import AddedRestaurants from './AddedRestaurants';
import { useNavigate } from 'react-router';
import { Avatar } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



 

 

const drawerWidth = 240;

 

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

 
function DashboardContent({children}) {
 // const [open, setOpen] = React.useState(true);
  const {hideNav,setHideNav,loadRestaurants,auth,snackbarMessage,handleSnackbarClose,snackbarOpen} = React.useContext(LoopContext)
  const [progress,setProgress] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setHideNav(!hideNav);
  };

  const init = async() =>{
    if(!auth){
        navigate("/login");
        return;
    }
    setProgress(true);
    const response = await loadRestaurants();
    console.log('Response from server: ',response);
    setProgress(false);

  }
  React.useEffect(()=>{
    init();
  },[]);


  return (
       <Box sx={{ display: 'flex'  }}>
        <CssBaseline />
        <AppBar position="absolute" open={hideNav}>
        
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(hideNav && { display: 'none' }),
              }}
            >
              <MenuIcon />
             
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
             
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={hideNav}>
        
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src="/loopkitchen.jpeg">
            
             </Avatar>
               <span><h2> Loop Kitchen</h2></span>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
           
          </Toolbar>
          <Divider />
          <List component="nav">
            <MenuItems />
             
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} >
            <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} message={snackbarMessage} 
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
               
            </Snackbar>
            {progress && <CircularProgress />}
            {!progress && 
            <  >
            {children}
            </ >
            
            
            
            }
            </Grid>
        
          </Container>
        </Box>
      </Box>
   );
}

export default function Dashboard({children}) {
  return <DashboardContent>{children}</DashboardContent>;
}