import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from './components/MenuBar.js'
import Box from '@material-ui/core/Box';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DepositedNfts from './pages/DepositedNfts.js';
import TokenProxies from './pages/TokenProxies.js';
import Home from './pages/Home.js';
import Fields from './pages/Fields.js';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Games from './pages/Games.js';

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
  },
});

function App() {

  const [injectedProvider, setInjectedProvider] = useState(undefined);
  /*   if (web3Modal) {
      console.log(web3Modal)
    } else {
      console.log("hmmm<<<")
    }
   */
  const connectWallet = async () => {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    setInjectedProvider(provider);
    //console.log(await provider.getSigner().getAddress())
  }

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  return (
    <div>
      <Router>
        <MenuBar web3Modal={web3Modal} connectWallet={connectWallet} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        <div>
          <Switch>
            <Route path="/deposits">
              <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Box mt={10}>
                    <DepositedNfts injectedProvider={injectedProvider} />
                  </Box>
                </Grid>
                <Grid item md={2}></Grid>
              </Grid>
            </Route>
            <Route path="/proxies">
              <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Box mt={10}>
                    <TokenProxies injectedProvider={injectedProvider} />
                  </Box>
                </Grid>
                <Grid item md={2}></Grid>
              </Grid>
            </Route>
            <Route path="/fields">
              <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Box mt={10}>
                    <Fields injectedProvider={injectedProvider} />
                  </Box>
                </Grid>
                <Grid item md={2}></Grid>
              </Grid>
            </Route>
            <Route path="/games">
              <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Box mt={10}>
                    <Games />
                  </Box>
                </Grid>
                <Grid item md={2}></Grid>
              </Grid>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;
