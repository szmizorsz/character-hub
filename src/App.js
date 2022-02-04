import React from 'react';
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


function App() {
  return (
    <div>
      <Router>
        <MenuBar />
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
