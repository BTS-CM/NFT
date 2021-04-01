import React, {useEffect, useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { makeStyles } from '@material-ui/core/styles';
import {Apis} from "bitsharesjs-ws";
const axios = require("axios");

const { TabPanel, a11yProps } = require("./tabs")

function getPngDimensions(base64) {
  const header = atob(base64.slice(0, 50)).slice(16,24)
  const uint8 = Uint8Array.from(header, c => c.charCodeAt(0))
  const dataView = new DataView(uint8.buffer)

  return {
    width: dataView.getInt32(0),
    height: dataView.getInt32(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}

const queryClient = new QueryClient();

function DisplayedNFT (properties) {
  let Apis = properties.apis;
  let dataProps = properties.data;

  let id = dataProps.id;
  let symbol = dataProps.symbol;
  let precision = dataProps.precision;

  let issuer = dataProps.issuer;
  const [issuerName, setIssuerName] = useState();
  const [nftHolder, setNftHolder] = useState();
  const [esDetails, setESDetails] = useState();
  const [value, setValue] = useState(0);


  async function requestData () {

    if (!issuerName || !issuerName.length) {
      const issuerObject = await Apis.db.get_objects([issuer]);
      setIssuerName(issuerObject[0].name);
    }

    if (!nftHolder || !nftHolder.length) {
      const nftHolder = await axios.get(
        `http://localhost:8082/proxy/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`
        //`https://api.testnet.bitshares.ws/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`
      );
      setNftHolder(nftHolder.data);
    }

    if (!esDetails || !esDetails.length) {
      const esData = await axios.get(
        //`https://api.testnet.bitshares.ws/lookup/asset/${id}`
        `http://localhost:8082/proxy/lookup/asset/${id}`
      );
      setESDetails(esData.data);
    }

  }

  /*
  const { status, data, error, isFetching } = useQuery(`NFT_${id}`, async () => {
    const issuerObject = await Apis.db.get_objects([issuer]);
    const nftHolder = await axios.get(
      `http://localhost:8082/proxy/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`
      //`https://api.testnet.bitshares.ws/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`
    );
    const esData = await axios.get(
      //`https://api.testnet.bitshares.ws/lookup/asset/${id}`
      `http://localhost:8082/proxy/lookup/asset/${id}`
    );

    return {
      'name': issuerObject[0].name,
      'holder': nftHolder.data,
      'elastic': esData.data
    }
  });

  if (data && !isFetching && !error) {
    if (!issuerName || !issuerName.length) {
      setIssuerName(data.name);
    }

    if (!nftHolder || !nftHolder.length) {
      setNftHolder(data.holder);
    }

    if (!esDetails || !esDetails.length) {
      setESDetails(data.elastic);
    }
  }
  */

  useEffect(() => {
    requestData();
  }, []);


  let permissions = esDetails ? esDetails.permissions : undefined;
  let dynamic_asset_data = esDetails ? esDetails.dynamic_asset_data : undefined;
  let current_supply = dynamic_asset_data ? dynamic_asset_data.current_supply : undefined;

  let flags = esDetails ? esDetails.flags : undefined;

  let options = dataProps.options;
  let max_supply = options.max_supply;

  let description = JSON.parse(options.description); // json data
  let main = description.main;
  let market = description.market;
  let short_name = description.short_name;

  let nft_signature = description.nft_signature;

  let nft_object = description.nft_object;
  let artist = nft_object.artist;
  let attestation = nft_object.attestation;
  let narrative = nft_object.narrative;
  let title = nft_object.title;

  let type = nft_object.type;
  let encoding = nft_object.encoding;
  let image_png = nft_object.image_png;
  let imgURL = encoding && encoding === "base64"
                  ? "data:image/png;base64," + image_png
                  : undefined;

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    chip: {
      margin: theme.spacing(0.25)
    },
    media: imgURL ? getPngDimensions(image_png) : {},
    root: {
      textAlign: 'center'
    }
  }));

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.paper} id={id}>
      <Typography gutterBottom variant="h4" component="h1">
        "{short_name}" by {artist}
      </Typography>
      {
        imgURL
          ? <a href={imgURL}>
              <img src={imgURL} alt={short_name + " image"} className={classes.media} />
            </a>
          : undefined
      }
      <Typography gutterBottom variant="h6" component="h4">
        {main}
      </Typography>
      <br/>
      <AppBar position="static">
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChange}
          aria-label="scrollable auto tabs example"
        >
          <Tab label="NFT" {...a11yProps(0)} />
          <Tab label="Asset" {...a11yProps(1)} />
          <Tab label="Flags" {...a11yProps(2)} />
          <Tab label="Permissions" {...a11yProps(3)} />
          <Tab label="Signature" {...a11yProps(4)} />
          <Tab label="JSON" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <p>Attestation: "{attestation}"</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chip className={classes.chip} label={`Current owner: ${nftHolder && nftHolder.length ? nftHolder[0].name : '???'}`} />
        <Chip className={classes.chip} label={`Quantity issued: ${current_supply ? current_supply : '???'}`} />
        <Chip className={classes.chip} color={issuerName && issuerName === 'null-account' ? 'primary' : 'secondary'} label={`Asset ownership: ${issuerName}`} />
        <br/>
        <br/>
        <a href={"https://wallet.bitshares.org/#/asset/" + symbol} style={{'padding': '5px'}}>
          <Button variant="contained">{symbol}</Button>
        </a>
        <a href={`https://wallet.bitshares.org/#/market/${symbol}_${market}`}>
          <Button variant="contained">Make Offer</Button>
        </a>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          flags
            ? Object.keys(flags).map(
                (flag) => {
                  const flagValue = flags[flag];
                  return <Chip
                          className={classes.chip}
                          avatar={<Avatar>{flagValue === true || flagValue === 'true'  ? '✔' : '❌'}</Avatar>}
                          label={flag.replace(/_/g, ' ')}
                         />
                }
              )
            : undefined
        }
      </TabPanel>
      <TabPanel value={value} index={3}>
        {
          permissions
            ? Object.keys(permissions).map(
                (permission) => {
                  const permissionValue = permissions[permission];
                  return <Chip
                          className={classes.chip}
                          avatar={<Avatar>{permissionValue === true || permissionValue === 'true'  ? '✔' : '❌'}</Avatar>}
                          label={permission.replace(/_/g, ' ')}
                         />
                }
              )
            : undefined
        }
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TextareaAutosize aria-label={"signature"} rowsMin={5} style={{'minWidth': '100%'}} defaultValue={nft_signature ? nft_signature : undefined} />;
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TextareaAutosize aria-label={"elasticSearchData"} rowsMin={5} rowsMax={20} style={{'minWidth': '100%'}} defaultValue={esDetails ? JSON.stringify(esDetails) : 'N/A'} />;
      </TabPanel>
    </Paper>
  );
}

export default function NFT(properties) {
  return (
    <Grid item xs={12}>
      <QueryClientProvider client={queryClient}>
        <DisplayedNFT {...properties} />
      </QueryClientProvider>
    </Grid>
  );
}
