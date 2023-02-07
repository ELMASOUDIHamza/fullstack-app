import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {

  const linkStyle = {
    textDecoration: "none",
    color: "#FFFFFF"
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={linkStyle}>Fullstack CRUD Application</Link>  
          </Typography>
          
          
          <Link to="/" style={linkStyle} >
              <Button variant='text' color='inherit' >Home </Button> 
          </Link>
          
          <Link to="about" style={linkStyle} >
            <Button variant="text" color="inherit">About</Button>
          </Link>
          <Link to="/addUser" style={linkStyle} >
            <Button variant="text" color="inherit">ADD USER</Button>
          </Link>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}