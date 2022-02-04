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

function MenuBar() {
    const classes = useStyles();

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
                            <Grid item md={2}>
                                <Box mt={0.5} mr={1}>
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/deposit">Deposit</Button>
                                </Box>
                            </Grid>
                            <Grid item md={2}>
                                <Box mt={0.5} mr={1}>
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/proxies">Proxies</Button>
                                </Box>
                            </Grid>
                            <Grid item md={2}>
                                <Box mt={0.5} mr={1}>
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/fields">Fields</Button>
                                </Box>
                            </Grid>
                            <Grid item md={2}>
                                <Box mt={0.5} mr={1}>
                                    <Button color="inherit" fullWidth component={Link} className={classes.button} to="/games">Games</Button>
                                </Box>
                            </Grid>

                            <Grid item md={4}>
                                <Box mt={0.3} ml={5}>
                                    <Button color="inherit" variant="outlined" fullWidth component={Link} to="/">Connect Wallet</Button>
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
