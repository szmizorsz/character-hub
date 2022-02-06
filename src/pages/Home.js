import React from 'react';
import Box from '@material-ui/core/Box'
import banner from '../assets/home_banner.png'
import Typography from '@material-ui/core/Typography'

const Home = () => {
    return (
        <>
            <Box mt={20} mb={3}>
                <Typography variant="h3" fontStyle="oblique" component="p" align="center">
                    Welcome to the Charater Hub!
                </Typography>
            </Box>
            <Box mb={30}>
                <Typography fontSize={6} fontStyle="oblique" component="p" align="center">
                    The place where you can transfer and engage your beloved NFTs in fields and games
                </Typography>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
                <img src={banner} alt="Home banner" />
            </Box>
        </>
    )
}

export default Home;
