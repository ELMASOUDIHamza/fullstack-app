
import { Typography, TextField, Paper, Button, ButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessSnackbar from '../layouts/SuccessSnackbar';

const AddUser = () => {

    let navigate = useNavigate();

    const txtStyle = {
        backgroundColor: "rgb(210, 230, 240) ",
        borderRadius: "10px",
        margin: "20px auto",
        display: "center"
    }

    const [newUser, setNewUser] = useState(
        {
            username:"",
            fullname:"",
            email:""
        }
    );
/* sanckbar : */
const [open, setOpen] = useState(false);
const [inputState, setInputState] = useState(false);

    const {username, fullname, email} = newUser ; 

    const onInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]:e.target.value })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8080/users", newUser) ;
setOpen(true); setInputState(true)
setTimeout(()=> {
    navigate("/") ; 
}, 3000)
        
        
    }
 
    return (
        <>
        
        
            <Typography variant="h3" align='center' m="30px">
               Add New User
            </Typography>

            <Paper elevation={24} 
                sx={{ maxWidth: "600px", p: "60px 0px", m: "auto auto",
                borderRadius: "10px"  , backgroundColor: "rgb(23, 32, 42)" }} >
                <Box sx={{width: '60%', m: "0px auto" }} >

                <form onSubmit={(e)=> { 
                    onSubmit(e); 
                     }} >

                
                    <TextField required fullWidth disabled={inputState}
                        label="USERNAME"  variant="outlined"
                        sx={txtStyle} name="username" type="text"
                        onChange={ (e)=> onInputChange(e) } value={username}
                    />
                    <TextField required  fullWidth disabled={inputState}
                        label="FULLNAME"  variant="outlined" type="text"
                        sx={txtStyle} name="fullname" value={fullname}
                        onChange={ (e)=> onInputChange(e) }
                    />
                    <TextField required fullWidth disabled={inputState}
                        label="EMAIL" variant="outlined"
                        sx={txtStyle} name="email" type="email"
                        onChange={ (e) => onInputChange(e)}
                        value={email}
                    />
                    <ButtonGroup  fullWidth disabled={inputState} >
                        <Button type='submit' variant='contained'
                        sx={{ m: "20px 5% auto auto" }} >SUBMIT</Button>
                        <Link to="/" style={{textDecoration: "none"}} >
                            <Button variant='contained' color="error" 
                                  sx={{ m: "20px auto", textDecoration: "none" }} > Cancel</Button>
                         </Link>
                    </ButtonGroup>
                    { open ? <SuccessSnackbar severity="success" text="New user has been added successfully !" /> : '' }
                    
                    </form>
                </Box>
                
            </Paper>



        </>

    );
};

export default AddUser;