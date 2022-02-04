import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from './components/MenuBar.js'
import Box from '@material-ui/core/Box';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DepositNft from './components/DepositNft.js';
import Home from './components/Home.js'
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
  },
});

function App() {

  const [injectedProvider, setInjectedProvider] = useState();

  const connectWallet = async () => {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    setInjectedProvider(provider);
    const signer = provider.getSigner();
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
            <Route path="/deposit">
              <Grid container>
                <Grid item md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Box mt={10}>
                    <DepositNft />
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
