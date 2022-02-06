import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import useNftsFromProxy from '../hooks/LoadNftsFromProxy';
import ProxyCards from '../components/ProxyCards';
import useFields from '../hooks/LoadFields';

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

const TokenProxies = ({ injectedProvider }) => {
    const [nftList, ownNftList] = useNftsFromProxy(injectedProvider);
    const fields = useFields(injectedProvider);

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
                    Loading... please, make sure to connect your wallet and select the matic mumbai network!
                </div>
            </Box>
        )
    }

    return (
        <>
            <div className={classes.root}>
                <div >
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="All NFT proxies" />
                        <AntTab label="My NFT proxies" />
                    </AntTabs>
                    <Typography className={classes.padding} />
                </div>
            </div>
            <TabPanel value={value} index={0}>
                <ProxyCards nftList={nftList} injectedProvider={injectedProvider} fields={fields} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProxyCards nftList={ownNftList} injectedProvider={injectedProvider} fields={fields} />
            </TabPanel>
        </>
    )
}

export default TokenProxies;
