import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LoopContext } from '../context/LoopContext';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
export default function AutoComplete() {
  const {allRestau,updateAddedValues} = React.useContext(LoopContext);
  const [selected,setSelected] = React.useState([]);
  return (
    <Box sx={{ width: '100%' }}>
     <br />
    <Stack spacing={2} >
      <Item>
       
      <table><tr><td style={{width:"500px"}}>
      {allRestau && <Autocomplete
        multiple
        id="size-small-outlined-multi"
        size="small"
        options={allRestau}
        getOptionLabel={(option) => option.name}
        value = {selected}
        onChange={(event,values) => {
            setSelected(values);
           
            console.log(values);
          }}
        renderInput={(params) => (
          <TextField {...params} label="Select Restaurants" placeholder="add"   />
        )}
      />}
      </td><td>
       <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      
      style={{width:"90px",marginLeft:"20px", color:"white"}}
      onClick={()=>{
          
        console.log('selected:',selected);
        updateAddedValues(selected);
        setSelected([]);
      }}
    >
      Add
    </Button>
    </td>
    </tr></table> 
    </Item> 
    </Stack>
    <br />
    
    </Box>
  );
}

 