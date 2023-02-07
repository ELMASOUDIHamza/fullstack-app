import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import UsersTable from '../layouts/UsersTable';

const Home = () => {
    //useContext
    return (
        <Container sx={{ margin: "20px auto"}} >
            
            <Box sx={{ maxWidth: "1000px", margin: "auto auto"}} >
                <UsersTable />
            </Box>

        </Container>
            
                
            
       
    );
};

export default Home;