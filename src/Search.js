import React, {useEffect, useRef, useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Fuse from 'fuse.js'

const { useIdleQueryHook } = require("./reactQuery");
const queryClient = new QueryClient();
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  searchResults: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SearchPanel (properties) {

  const [searchValue, setSearchValue] = useState();
  const [overlay, setOverlay] = useState();
  const classes = useStyles();
  const op = useRef(null);

  const searchData = properties && properties.art ? properties.art : [];
  if (!searchData || !searchData.length) {
    return <p>loading search...</p>;
  }

  const eraseSearch = (event) => {
    setSearchValue();
    setOverlay();
  };

  const updateSearchValue = (event) => {
    setSearchValue(event.target.value);
    setOverlay();

    const fuse = new Fuse(
      searchData,
      {
        includeScore: true,
        keys: ['name', 'id']
      }
    );

    const result = fuse.search(event.target.value);
    if (result && result.length > 0) {
      console.log(result)
      setOverlay(
        result.slice(0,5).map(crypto => {
          if (crypto.item && crypto.item.id) {
            return (
              <ListItemLink href={`/nft/${crypto.item.name}`}>
                <ListItemText primary={`${crypto.item.id}: ${crypto.item.name}`} />
              </ListItemLink>
            )
          }
        })
      );
    } else {
      eraseSearch(event);
    }
  };

  return (<form className={classes.root} noValidate autoComplete="off">
            <Typography gutterBottom variant="h4" component="h1">
              Search for NFT on Bitshares
            </Typography>
            <TextField key="searchInput" id="outlined-basic" label="Search for NFT" onChange={updateSearchValue} variant="outlined" />
            <div className={classes.root}>
              <List component="nav" aria-label="search result list">
                {
                  overlay
                }
              </List>
            </div>
          </form>);
}

export default function Search(properties) {
  return (
    <SearchPanel {...properties} />
  );
}
