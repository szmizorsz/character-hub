import React from 'react';
import Box from '@material-ui/core/Box'
import banner from '../assets/home_banner.png'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const privateKeys = ['8fa8fa8af32e12235bba6c819c08a1f40559471482637c5d7095e5016bef0506',
    '8ea97d5067dc234a17ae440add78814bb684da7533865560d9b3dd911f0a1d35'];

const useStyles = makeStyles((theme) => ({
    icon: {
        maxWidth: 50,
        maxHeight: 50
    },
    accountsButton: {
        textTransform: 'none',
    },
}));

const Home = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box mt={20}>
                <Typography variant="h3" fontStyle="oblique" component="p" align="center">
                    Welcome to the Charater Hub!
                </Typography>
            </Box>
            <Box >
                <Typography fontSize={6} fontStyle="oblique" component="p" align="center">
                    The place where you can transfer and engage your beloved NFTs in fields and games
                </Typography>
            </Box>
            <Grid container>
                <Grid item md={10}></Grid>
                <Grid item md={2}>
                    <Box mt={22} mr={5}>
                        <Typography variant="body2" color="textSecondary" component="p" align="right">
                            You can try it:
                        </Typography>
                    </Box>
                    <Box mr={3}>
                        <Grid container justify="flex-end">
                            <Button className={classes.accountsButton} variant="primary" color="primary" align="right" onClick={handleClickOpen}>
                                Accounts
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Box mt={2} display="flex" justifyContent="center">
                <img src={banner} alt="Home banner" />
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="false"
            >
                <div style={{ width: 800 }}>
                    <DialogTitle id="alert-dialog-title">Accounts to play with</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The following accounts have been preloaded on both chains (Ropsten and Mumbai) with ETH and Matic. They already deposited NFTs (characters) if you would like to try out those functionalities. Just import the private keys into Metamask and login:
                        </DialogContentText>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Private key</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {privateKeys.map((row) => (
                                        <TableRow >
                                            <TableCell>{row}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    )
}

export default Home;
