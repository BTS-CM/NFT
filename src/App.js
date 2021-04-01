import './App.css';

import React, {useEffect, useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import {Apis} from "bitsharesjs-ws";
import 'fontsource-roboto';

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

import NFT from "./NFT";
const art = require("./art.json");
const { TabPanel, a11yProps } = require("./tabs")

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

const queryClient = new QueryClient();

function Gallery() {

  const [nfts, setNfts] = useState([]);
  const { status, data, error, isFetching } = useQuery('wsNFT', async () => {
    await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
    return await Apis.db.get_assets(art.art);
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

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: colour,
        },
      }),
    [colour],
  );

  const changeColour = (event, newValue) => {
    setColour(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>

            <Grid item xs={12}>
              <Paper className={classes.paper}>

                <AppBar position="static">
                  <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Bitshares NFT viewer" {...a11yProps(0)} />
                    <Tab label="About" {...a11yProps(1)} />
                    <Tab label="License" {...a11yProps(2)} />
                    <Button style={{'margin': '5px', 'float': 'right'}} size="small" variant="contained" onClick={() => { colour === 'dark' ? setColour('light') : setColour('dark') }}>
                      {colour === 'dark' ? <NightsStayIcon /> : <Brightness5Icon />}
                    </Button>
                  </Tabs>
                </AppBar>

              </Paper>
            </Grid>


            <TabPanel value={value} index={0}>
            <Grid container spacing={4}>
              <QueryClientProvider client={queryClient}>
                <Gallery />
              </QueryClientProvider>
            </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
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
            </TabPanel>

            <TabPanel value={value} index={2}>
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
            </TabPanel>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
