import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { LoopContext } from '../context/LoopContext';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BookmarkedRestaurants() {
    const {bookmarked,bookmark,deleteBookmark} = React.useContext(LoopContext);
    const inputEl = React.useRef(null);
   const getSrc = (value) =>{
       return 'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"'+value+'"}';
   }
  
   console.log("bookmarked Content::::::",bookmarked);
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <h2 style={{marginLeft:"15px"}}>Bookmarks</h2>
        {bookmarked&& bookmarked.map((add)=>(
            <Item>
           
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{width:"90px",marginLeft:"20px"}}
              onClick={(e)=>deleteBookmark(add.id)} 
            >
              Remove
            </Button>
            <iframe allowtransparency="true" 
            style={{
                width: '100%',
                height: '400px',
                frameborder: '0',
                border: '0',
                 
            }}
              src={getSrc(add.name)}  allowfullscreen></iframe>
                
                
             </Item>
        ))

        }
        
         
      </Stack>
    </Box>
  );
}