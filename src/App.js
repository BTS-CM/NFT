import './App.css';

import React, {useEffect, useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import {Apis} from "bitsharesjs-ws";
import 'fontsource-roboto';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";

import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NFT from "./NFT";
import Search from "./Search";

const art = require("./art.json");
const { TabPanel, a11yProps } = require("./tabs")

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

function Gallery() {

  const [nfts, setNfts] = useState([]);
  const { status, data, error, isFetching } = useQuery('wsNFT', async () => {
    await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
    return await Apis.db.get_assets(art.map(asset => asset.name));
  });

  if (!nfts || !nfts.length) {
    if (data && !error) {
      setNfts(data.filter(x => x))
    }
  }

  return nfts && nfts.length > 0
    ? nfts.map(nft => <NFT apis={Apis} data={nft} key={nft.id} />)
    : [];
}

export default function App() {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colour, setColour] = useState(prefersDarkMode ? 'dark' : 'light')
  const [value, setValue] = useState(0);
  const [drawerToggle, setDrawerToggle] = useState(false);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: colour,
        },
      }),
    [colour],
  );


  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerToggle(value);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className={classes.root}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>

              <Grid item xs={12}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <MenuIcon />
                    </IconButton>

                    <Drawer anchor='left' open={drawerToggle} onClose={toggleDrawer(false)}>
                      <div
                        className={classes.list}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                      >
                        <List>
                          <ListItem button component={RouterLink} key={'Featured'} to={"/"}>
                            <ListItemText primary={'Featured NFT'} />
                          </ListItem>
                          <ListItem button component={RouterLink} key={'Search'} to={"/search"}>
                            <ListItemText primary={'Search'} />
                          </ListItem>
                          <ListItem button component={RouterLink} key={'About'} to={"/about"}>
                            <ListItemText primary={'About'} />
                          </ListItem>
                          <ListItem button component={RouterLink} key={'License'} to={"/license"}>
                            <ListItemText primary={'License'} />
                          </ListItem>
                        </List>
                      </div>
                    </Drawer>

                    <Typography variant="h6" className={classes.title} onClick={() => setValue(0)}>
                      Bitshares NFT viewer
                    </Typography>
                    <Button style={{'margin': '5px', 'float': 'right'}} size="small" variant="contained" onClick={() => { colour === 'dark' ? setColour('light') : setColour('dark') }}>
                      {colour === 'dark' ? <NightsStayIcon /> : <Brightness5Icon />}
                    </Button>
                  </Toolbar>
                </AppBar>

              </Grid>

              <Grid item xs={12}>
                <Switch>
                  <Route path="/search">
                    <Grid container spacing={4} style={{'maxWidth': '100%'}}>
                      <Search art={art} />
                    </Grid>
                  </Route>

                  <Route path="/nft/:id">
                    <p>NFT page</p>
                  </Route>

                  <Route path="/about">
                    <Paper className={classes.paper}>
                      <p>
                        Bitshares was the first DPoS blockchain technology with self-governance, 3 seconds processing time and in-built decentralized financial platform. Combining ethics, responsibility, innovations, fairness, knowledge and 6 years of experience to manage a safe, stable and scalable ecosystem. <a href="https://bitshares.org">Read more about Bitshares!</a>
                      </p>
                      <p>
                        Non-Fungible Tokens (NFTs) can easily be issued by anyone on the Bitshares blockchain by following the <a href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification">Bitshares NFT Specification</a>. Feel free to fork this NFT viewer for your own Bitshares based NFT gallery.
                      </p>
                      <p>
                        Fees on the Bitshares blockchain are <a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">considerably lower than competitor platforms</a>. These fees can be further reduced by purchasing a life-time membership as well as issuing sub-assets like "gallery_name.nft_name".
                      </p>
                    </Paper>
                  </Route>

                  <Route path="/license">
                    <Paper className={classes.paper}>
                      <p>
                        MIT License
                      </p>
                      <p>
                        Copyright (c) 2021 BTS Dev
                      </p>
                      <p>
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:
                      </p>
                      <p>
                        The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.
                      </p>
                      <p>
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                      </p>
                      <p>
                        <a href="https://github.com/BTS-CM/NFT">GitHub repository</a>
                      </p>
                    </Paper>
                  </Route>

                  <Route path="/">
                    <Grid container style={{'maxWidth': '100%'}}>
                      <QueryClientProvider client={queryClient}>
                        <Gallery />
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
