import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import {
  Link as RouterLink,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import TranslateIcon from '@material-ui/icons/Translate';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AppBar from '@material-ui/core/AppBar';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const locales = [
  'en',
  'da',
  'th'
];

const ITEM_HEIGHT = 48;


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
  const { i18n } = useTranslation();

  let environment = properties.environment;

  let colour = properties.colour;
  let setColour = properties.setColour;
  const [drawerToggle, setDrawerToggle] = useState(false);

  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerToggle(value);
  };

  const [language, setLanguage] = React.useState('en');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClicked = (language) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  }

  return (
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)}  color="inherit" edge="start" className={classes.menuButton} aria-label="menu">
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
                  <ListItemText primary={i18n.t('nav:link1')} />
                </ListItem>
                <ListItem button component={RouterLink} key={'Gallery'} to={"/gallery"}>
                  <ListItemText primary={i18n.t('nav:link2')} />
                </ListItem>
                <ListItem button component={RouterLink} key={'Listings'} to={"/listings"}>
                  <ListItemText primary={i18n.t('nav:link3')} />
                </ListItem>
                <ListItem button component={RouterLink} key={'Search'} to={"/search"}>
                  <ListItemText primary={i18n.t('nav:link4')} />
                </ListItem>
                <ListItem button component={RouterLink} key={'About'} to={"/about"}>
                  <ListItemText primary={i18n.t('nav:link5')} />
                </ListItem>
                <ListItem button component={RouterLink} key={'License'} to={"/license"}>
                  <ListItemText primary={i18n.t('nav:link6')} />
                </ListItem>
                <ListItem button component={RouterLink} key={'Other Viewers'} to={"/viewers"}>
                  <ListItemText primary={i18n.t('nav:link7')} />
                </ListItem>
              </List>
            </div>
          </Drawer>

          <Typography variant="h6" color="inherit" className={classes.title}>
            {i18n.t("nav:header")} {environment === "staging" ? i18n.t("nav:staging") : undefined}
          </Typography>

          <Button
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            size="small"
            variant="contained"
            onClick={handleClick}
          >
            <TranslateIcon />
          </Button>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {locales.map((option) => (
              <MenuItem key={option} selected={option === language} onClick={() => { handleClicked(option) }}>
                {option}
              </MenuItem>
            ))}
          </Menu>

          <Button style={{'margin': '5px', 'float': 'right'}} size="small" variant="contained" onClick={() => { colour === 'dark' ? setColour('light') : setColour('dark') }}>
            {colour === 'dark' ? <NightsStayIcon /> : <Brightness5Icon />}
          </Button>
        </Toolbar>
      </AppBar>
  );
}
