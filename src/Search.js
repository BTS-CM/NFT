import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Fuse from 'fuse.js';

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

  const [overlay, setOverlay] = useState();
  const classes = useStyles();

  const searchData = properties && properties.art ? properties.art : [];
  if (!searchData || !searchData.length) {
    return <p>loading search...</p>;
  }

  const eraseSearch = (event) => {
    setOverlay();
  };

  const updateSearchValue = (event) => {
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
      setOverlay(
        result.slice(0,5).map(crypto => {
          if (crypto.item && crypto.item.id) {
            return (
              <ListItemLink href={`/nft/${crypto.item.name}`}>
                <ListItemText primary={`${crypto.item.id}: ${crypto.item.name}`} />
              </ListItemLink>
            )
          } else {
            return undefined;
          }
        }).filter(x => x)
      );
    } else {
      eraseSearch(event);
    }
  };

  /*
    <form className={classes.root} noValidate autoComplete="off">
    </form>
  */

  return (
    <Grid item xs={12} key={"Search Window"}>
      <Paper className={classes.paper} style={{'padding': '20px'}}>
          <Typography gutterBottom variant="h4" component="h1">
            Search for NFT
          </Typography>
          <Typography variant="body1" gutterBottom>
            Either enter the id (1.3.x) or name of the NFT you wish to find
          </Typography>
          <TextField
            key="searchInput"
            id="outlined-basic"
            label="NFT name"
            onChange={updateSearchValue}
            variant="outlined"
            style={{'marginTop': '20px'}}
          />
          <div className={classes.root}>
            <List component="nav" aria-label="search result list">
              {
                overlay
              }
            </List>
          </div>
      </Paper>
    </Grid>

  );
}

export default function Search(properties) {
  return (
    <SearchPanel {...properties} />
  );
}
