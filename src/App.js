import './App.css';

import React, {useEffect, useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import {Apis} from "bitsharesjs-ws";
import 'fontsource-roboto';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
  useParams
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

import Search from "./Search";
import About from "./About";
import License from "./License";
import Nav from "./Nav";
import IndividualNFT from "./IndividualNFT";
import MainPage from "./MainPage";
import Gallery from "./Gallery";

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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className={classes.root}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>

              <Grid item xs={12}>
                <Nav colour={colour} setColour={setColour} />
              </Grid>

              <Grid item xs={12}>
                <Switch>
                  <Route path="/search">
                    <Grid container style={{'maxWidth': '100%'}} key="search">
                      <Search art={art} />
                    </Grid>
                  </Route>

                  <Route path="/nft/:id">
                    <Grid container style={{'maxWidth': '100%'}} key="singleNFT">
                      <QueryClientProvider client={queryClient}>
                        <IndividualNFT />
                      </QueryClientProvider>
                    </Grid>
                  </Route>

                  <Route path="/about">
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <About />
                    </Grid>
                  </Route>

                  <Route path="/license">
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <License />
                    </Grid>
                  </Route>

                  <Route path="/gallery">
                    <Grid container style={{'maxWidth': '100%'}} key="index">
                      <QueryClientProvider client={queryClient}>
                        <Gallery art={art} />
                      </QueryClientProvider>
                    </Grid>
                  </Route>

                  <Route path="/">
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
