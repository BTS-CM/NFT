import React, {useEffect, useState} from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import {
  Link as RouterLink,
} from "react-router-dom";

import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NightsStayIcon from '@material-ui/icons/NightsStay';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
  width: 250,
  }
}));

export default function Nav(properties) {
  const classes = useStyles();
  let colour = properties.colour;
  let setColour = properties.setColour;
  const [drawerToggle, setDrawerToggle] = useState(false);

  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerToggle(value);
  };

  return (
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)}  color="inherit" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
                <ListItem button component={RouterLink} key={'Home'} to={"/"}>
                  <ListItemText primary={'Home'} />
                </ListItem>
                <ListItem button component={RouterLink} key={'Gallery'} to={"/gallery"}>
                  <ListItemText primary={'Gallery'} />
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

          <Typography variant="h6" color="inherit" className={classes.title}>
            Bitshares NFT viewer
          </Typography>
          <Button style={{'margin': '5px', 'float': 'right'}} size="small" variant="contained" onClick={() => { colour === 'dark' ? setColour('light') : setColour('dark') }}>
            {colour === 'dark' ? <NightsStayIcon /> : <Brightness5Icon />}
          </Button>
        </Toolbar>
      </AppBar>
  );
}
