import './App.css';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

import 'fontsource-roboto';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Helmet } from "react-helmet";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Search from "./Search";
import About from "./About";
import License from "./License";
import Nav from "./Nav";
import IndividualNFT from "./IndividualNFT";
import MainPage from "./MainPage";
import Gallery from "./Gallery";
import Viewers from "./Viewers";
import List from "./List";

const artJSON = require("./art.json");
const config = require("./config.json");
const environment = config.environment;
const art = environment === "staging"
              ? artJSON.staging
              : artJSON.production;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}));

const queryClient = new QueryClient();

export default function App() {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colour, setColour] = useState(prefersDarkMode ? 'dark' : 'light')

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: colour,
        },
      }),
    [colour],
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className={classes.root}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>

              <Grid item xs={12}>
                <Nav colour={colour} environment={environment} setColour={setColour} />
              </Grid>

              <Grid item xs={12}>
                <Switch>
                  <Route path="/search">
                    <Helmet>
                      <title>Search for Bitshares NFTs</title>
                      <meta name="description" content="Search for NFTs on the Bitshares blockchain, just enter the asset name or id." />
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="search">
                      <Search art={art} />
                    </Grid>
                  </Route>

                  <Route path="/nft/:id">
                    <Helmet>
                      <title>Loading NFT</title>
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="individualNFT">
                      <QueryClientProvider client={queryClient}>
                        <IndividualNFT art={art} />
                      </QueryClientProvider>
                    </Grid>
                  </Route>

                  <Route path="/about">
                    <Helmet>
                      <title>About this Bitshares NFT viewer</title>
                      <meta name="description" content="Find out more information about this Bitshares NFT viewer!" />
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <About />
                    </Grid>
                  </Route>

                  <Route path="/viewers">
                    <Helmet>
                      <title>Alternative Bitshares NFT viewers</title>
                      <meta name="description" content="Where to find other Bitshares NFT galleries" />
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <Viewers />
                    </Grid>
                  </Route>

                  <Route path="/license">
                    <Helmet>
                      <title>License</title>
                      <meta name="description" content="Bitshares NFT viewer license (MIT)" />
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <License />
                    </Grid>
                  </Route>

                  <Route path="/gallery">
                    <Helmet>
                      <title>Bitshares NFT Gallery</title>
                      <meta name="description" content="Gallery view of several Bitshares NFTs" />
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <QueryClientProvider client={queryClient}>
                        <Gallery art={art} />
                      </QueryClientProvider>
                    </Grid>
                  </Route>

                  <Route path="/listings">
                    <Helmet>
                      <title>List of NFTs on Bitshares</title>
                      <meta name="description" content="List view of several Bitshares NFTs" />
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <QueryClientProvider client={queryClient}>
                        <List art={art} />
                      </QueryClientProvider>
                    </Grid>
                  </Route>

                  <Route path="/">
                    <Helmet>
                      <title>NFTea Gallery - A Bitshares based NFT viewer</title>
                      <meta name="description" content="View NFT from the Bitshares blockchain at the NFTea Gallery" />
                    </Helmet>
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <QueryClientProvider client={queryClient}>
                        <MainPage art={art} />
                      </QueryClientProvider>
                    </Grid>
                  </Route>

                </Switch>
              </Grid>

            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </Router>
  );
}
