import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    header: {
        flexGrow: 1,
        backgroundColor: "black",
        color: "white",
        boxShadow: "0px 0px 0px 0px"
    },
    button: {
        textTransform: "none",
        //fontWeight: 'bold',
        fontSize: 16
    }
}));

function MenuBar({ web3Modal, logoutOfWeb3Modal, connectWallet }) {
    const classes = useStyles();

    const modalButtons = [];
    if (web3Modal) {
        if (web3Modal.cachedProvider) {
            modalButtons.push(
                <Button
                    onClick={logoutOfWeb3Modal}
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    type="submit">
                    Logout
                </Button>
            );
        } else {
            modalButtons.push(
                <Button
                    onClick={connectWallet}
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    type="submit">
                    Connect Wallet
                </Button>
            );
        }
    }

    return (
        <AppBar position="fixed" className={classes.header}>
            <Toolbar variant="dense">
                <Grid container>
                    <Grid item md={2}></Grid>
                    <Grid item xs={12} md={3}>
                        <Box mt={0.5}>
                            <Button color="inherit" component={Link} className={classes.button} to="/">CharacterHub</Button>
                        </Box>
                    </Grid>
                    <Grid item md={5}>
                        <Grid container spacing={24}>
                            <Grid item md={3}>
                                <Box mt={0.5} >
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/deposits">NFT Deposits</Button>
                                </Box>
                            </Grid>
                            <Grid item md={2}>
                                <Box mt={0.5} mr={1}>
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/proxies">NFT Proxies</Button>
                                </Box>
                            </Grid>
                            <Grid item md={2}>
                                <Box mt={0.5} mr={1}>
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/fields">Fields</Button>
                                </Box>
                            </Grid>
                            <Grid item md={1}>
                                <Box mt={0.5} mr={1}>
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/games">Games</Button>
                                </Box>
                            </Grid>

                            <Grid item md={4}>
                                <Box mt={0.3} ml={5}>
                                    {modalButtons}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;
