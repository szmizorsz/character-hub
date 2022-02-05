import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DepositNftDialog from '../components/DepositNftDialog';
import AllNFTs from '../components/AllNFTs';
import useNftsFromBridge from '../hooks/LoadNftsFromBridge';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(0),
    }
}));

const DepositedNfts = ({ injectedProvider }) => {
    const [nftDepositDialogOpen, setNftDepositDialogOpen] = useState(false);
    const [nftList, ownNftList] = useNftsFromBridge(injectedProvider);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // useEffect(() => {
    //     if (injectedProvider) {
    //         load();
    //     }
    // }, []);

    // const load = async () => {
    //     console.log(await injectedProvider.getSigner().getAddress())
    //     const signer = await injectedProvider.getSigner();
    //     const bridgeContract = new ethers.Contract(BRIDGE.ADDRESS, BRIDGE.ABI, signer)
    //     const id = await bridgeContract.id();
    //     console.log(id.toNumber())
    // }

    if (!injectedProvider) {
        return (
            <Box mt={10}>
                <div>
                    Loading... please, make sure to connect your wallet and select the relevant ehtereum network!
                </div>
            </Box>
        )
    }

    return (
        <>
            <Grid container>
                <Grid item md={10}>
                    <div className={classes.root}>
                        <div >
                            <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                                <AntTab label="All NFTs" />
                                <AntTab label="My NFTs" />
                            </AntTabs>
                            <Typography className={classes.padding} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box mt={1.5} ml={7}>
                        <Button
                            onClick={() => { setNftDepositDialogOpen(true) }}
                            variant="outlined"
                            type="submit">
                            Deposit NFT
                        </Button>
                    </Box>
                </Grid>
                <Grid item md={2}></Grid>
            </Grid>
            <TabPanel value={value} index={0}>
                <AllNFTs injectedProvider={injectedProvider} nftList={nftList} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AllNFTs injectedProvider={injectedProvider} nftList={ownNftList} />
            </TabPanel>
            <DepositNftDialog
                injectedProvider={injectedProvider}
                nftDepositDialogOpen={nftDepositDialogOpen}
                setNftDepositDialogOpen={setNftDepositDialogOpen} />
        </>
    )
}

export default DepositedNfts;
