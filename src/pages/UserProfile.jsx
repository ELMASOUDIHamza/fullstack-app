import { Paper, Typography, Grid, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState({code: '', username: '', fullname: '', email:''})
    const {id} = useParams();
  
    const loadData = async() => {
            const result = await axios.get(`http://localhost:8080/users/${id}`);
            setUser(result.data);
            console.log(result.data)
    }

    useEffect( () => { loadData() } , [] );
    return (
        
        <Grid container  >
            <Grid xs={6} m='40px auto'>
            <Paper elevation={24} sx={{bgcolor: 'beige', py: '50px' }} >
                <Stack spacing={3} >
                    <div style={{backgroundColor: 'white'}} >
                        <Typography fontSize='1.4em' align='center' pb='20px' >{`Profile number : ${user.id}`}</Typography>
                    </div>
                    <div style={{backgroundColor: 'white'}}>
                         <Typography fontSize='1.2em' align='center' >{`Username : ${user.username}`}</Typography>
                    </div>
                     <div style={{backgroundColor: 'white'}}>
                          <Typography fontSize='1.2em' align='center' >{`Fullname : ${user.fullname}`}</Typography>
                  </div>
                    <div style={{backgroundColor: 'white'}}>
                       <Typography fontZise='1.2em' align='center' >{`Email : ${user.email}`}</Typography>
                      </div>
                </Stack>

            </Paper>
            </Grid>
        </Grid>
    );
}

export default UserProfile;
