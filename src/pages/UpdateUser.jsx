
import { Typography, TextField, Paper, Button, ButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SuccessSnackbar from '../layouts/SuccessSnackbar';

const UpdateUser = () => {

    let navigate = useNavigate();

    const txtStyle = {
        backgroundColor: "rgb(210, 230, 240) ",
        borderRadius: "10px",
        margin: "20px auto",
        display: "center"
    }
    const {id} = useParams();
    const [newUser, setNewUser] = useState(
        {
            username: "",
            fullname:"",
            email:""
        }
    );

    const loadData = async()=>{
        const result = await  axios.get(`http://localhost:8080/users/${id}`);
        setNewUser(result.data);

    }
    const {username, fullname, email} = newUser ; 

    const onInputChange = (e) => {
        
        setNewUser({ ...newUser, [e.target.name]:e.target.value })
    }
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [inputState, setInputState] = useState(false);
    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/users/${id}`, newUser) ;
        setInputState(true);
        setOpenSnackbar(true);
    setTimeout(()=>{
        navigate("/");
    },5000)
        

    }
    useEffect (()=>{
        
        loadData();

    }, []);



    return (
        <>
        
            <Typography variant="h3" align='center' m="30px">
               Update User
            </Typography>

            <Paper elevation={24} 
                sx={{ maxWidth: "600px", p: "60px 0px", m: "auto auto",
                borderRadius: "10px"  , backgroundColor: "rgb(23, 32, 42)" }} >
                <Box sx={{width: '60%', m: "0px auto" }} >

                <form onSubmit={(e)=>onSubmit(e)} >

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
                    <ButtonGroup disabled={inputState}  fullWidth >
                        <Button type='submit' variant='contained' color='success'
                        sx={{ m: "20px 5% auto auto" }} >UPDATE</Button>
                        <Link to="/" style={{textDecoration: "none"}} >
                            <Button variant='contained' color="error" 
                                  sx={{ m: "20px auto", textDecoration: "none" }} >
                                    Cancel</Button>
                         </Link>
                    </ButtonGroup>

                    </form>
                    { openSnackbar ? <SuccessSnackbar text="Updated successfully" severity="info" /> : ''}
                </Box>
                
            </Paper>



        </>

    );
};

export default UpdateUser;