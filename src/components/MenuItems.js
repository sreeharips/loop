import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout'; 
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router';
import { LoopContext } from '../context/LoopContext';

export const MenuItems = ()=> {
    const navigate = useNavigate();
    const {setAuth} = React.useContext(LoopContext);

  return <React.Fragment>
    <ListItemButton onClick={()=>navigate("/home")}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    
    <ListItemButton onClick={()=>navigate("/bookmark")}>
      <ListItemIcon>
        <BookmarkIcon />
      </ListItemIcon>
      <ListItemText primary="Bookmark" />
    </ListItemButton>
    <ListItemButton onClick={()=>{
      setAuth(null);
      navigate("/login");
    }}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    
  </React.Fragment>}

 