import React, {useEffect, useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

import {
  LinkedinShareButton,
  TwitterShareButton,
  OKShareButton,
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  HatenaIcon,
} from "react-share";

import {Apis} from "bitsharesjs-ws";
const axios = require("axios");
const { TabPanel, a11yProps } = require("./tabs");
const { useQueryHook } = require("./reactQuery");

function getImage(nft_object) {
  let image;
  let imgURL;
  let dimensions;
  if (nft_object.media_png || nft_object.image_png) {
    image = nft_object.media_png || nft_object.image_png || undefined;
    imgURL = image
              ? "data:image/png;base64," + image
              : undefined;
  } else if (nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif) {
    image = nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif || undefined;
    imgURL = image
              ? "data:image/gif;base64," + image
              : undefined;
  } else if (nft_object.media_jpeg || nft_object.image_jpeg) {
    image = nft_object.media_jpeg || nft_object.image_jpeg || undefined;
    imgURL = image
              ? "data:image/jpeg;base64," + image
              : undefined;
  }

  return {
    image: image,
    imgURL: imgURL
  }
}

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
  let issuer = dataProps.issuer;

  const [issuerDetails, setIssuerDetails] = useState();
  const [nftHolder, setNftHolder] = useState();
  const [esDetails, setESDetails] = useState();
  const [value, setValue] = useState(0);

  useQueryHook(
    `https://api.testnet.bitshares.ws/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`,
    //`http://localhost:8082/proxy/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`,
    `getnftholders_${id}`,
    setNftHolder,
    {refetchInterval: 120000}
  );

  useQueryHook(
    `https://api.testnet.bitshares.ws/lookup/asset/${id}`,
    //`http://localhost:8082/proxy/lookup/asset/${id}`,
    `getAsset_${id}`,
    setESDetails,
    {}
  );

  useQueryHook(
    `https://api.testnet.bitshares.ws/openexplorer/object?object=${issuer}`,
    //`http://localhost:8082/proxy/openexplorer/object?object=${issuer}`,
    `getissuerName_${issuer}`,
    setIssuerDetails,
    {}
  );

  let issuerName = issuerDetails ? issuerDetails.name : undefined;
  let dynamic_asset_data = esDetails ? esDetails.dynamic_asset_data : undefined;
  let current_supply = dynamic_asset_data ? dynamic_asset_data.current_supply : undefined;

  let permissions = esDetails ? esDetails.permissions : undefined;
  let flags = esDetails ? esDetails.flags : undefined;

  let symbol = dataProps.symbol;
  let precision = dataProps.precision;
  let options = dataProps.options;
  let max_supply = options.max_supply;

  let description = JSON.parse(options.description); // json data
  let main = description.main;
  let market = description.market;
  let short_name = description.short_name;
  let nft_signature = description.nft_signature;

  let nft_object = description.nft_object;
  let artist = nft_object.artist ? nft_object.artist : undefined;
  let attestation = nft_object.attestation ? nft_object.attestation : undefined;
  let narrative = nft_object.narrative ? nft_object.narrative : undefined;
  let title = nft_object.title ? nft_object.title : undefined;
  let type = nft_object.type ? nft_object.type : undefined;

  /*
  let tags = nft_object.tags ? nft_object.tags : undefined;
  let nft_flags = nft_object.flags ? nft_object.flags : undefined;
  let license = nft_object.license ? nft_object.license : undefined;
  let holder_license = nft_object.holder_license ? nft_object.holder_license : undefined;
  let password_multihash = nft_object.password_multihash ? nft_object.password_multihash : undefined;
  */

  let encoding = nft_object.encoding;
  let { image, imgURL } = getImage(nft_object);

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    chip: {
      margin: theme.spacing(0.25)
    },
    //media: image ? getPngDimensions(image) : {},
    media: {},
    root: {
      textAlign: 'center'
    },
    a: {
      color: theme.palette.text.secondary,
      textDecoration: 'none'
    },
    share: {
      margin: theme.spacing(0.25)
    }
  }));

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const flagChips = flags
    ? Object.keys(flags).map(
        (flag) => {
          const flagValue = flags[flag];
          return flagValue === true
            ? <Chip
                className={classes.chip}
                avatar={<Avatar>{flagValue === true || flagValue === 'true'  ? '✔' : '❌'}</Avatar>}
                label={flag.replace(/_/g, ' ')}
               />
            : undefined;
        }
      ).filter(x => x)
    : undefined;

  const permissionTips = {
    charge_market_fee : "The asset issuer can enable market fees.",
    white_list : "The asset issuer can create a list of approved markets",
    override_authority : "The asset issuer can transfer this NFT back to themselves.",
    transfer_restricted : "This asset may only be transferred to/from the issuer or market orders",
    disable_force_settle: "Users may request force-settlement of this market-issued asset.",
    global_settle: "The issuer of this market-issued asset may globally settle the asset",
    disable_confidential: "The issuer of this asset can disable stealth transactions.",
    witness_fed_asset: "This market-issued asset can have its price feeds supplied by Bitshares witnesses.",
    committee_fed_asset: "This market-issued asset can have its price feeds supplied by Bitshares committee members.",
  };

  const permissionChips = permissions
    ? Object.keys(permissions).map(
        (permission) => {
          const permissionValue = permissions[permission];
          return permissionValue === true
            ? <Tooltip
                TransitionComponent={Zoom}
                disableFocusListener
                title={permissionTips[permission]}
              >
                <Chip
                  className={classes.chip}
                  avatar={<Avatar>{permissionValue === true || permissionValue === 'true'  ? '✔' : '❌'}</Avatar>}
                  label={permission.replace(/_/g, ' ')}
                 />
              </Tooltip>
            : undefined;

        }
      )
    : undefined

  const shareUrl = `https://btsnft.onrender.com/${symbol}`;

  return (
    <Grid item xs={12} style={{'paddingBottom': '25px'}} key={symbol + "NFT"}>
      <Paper className={classes.paper} id={id}>
        <Typography gutterBottom variant="h4" component="h1">
          "<a href={`/nft/${symbol}`}  className={classes.a}>{short_name}</a>" by {artist}
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
        <AppBar position="static" color="inherit">
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
            <Tab label="Share" {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Typography variant="body1" gutterBottom>
            <b>Attestation</b>: "{attestation}"
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Narrative</b>: "{narrative}"
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Chip className={classes.chip} label={`Current owner: ${nftHolder && nftHolder.length ? nftHolder[0].name : '???'}`} />
          <Chip className={classes.chip} label={`Quantity issued: ${current_supply ? current_supply : '???'}`} />
          <Chip className={classes.chip} label={`File type: ${type ? type : '???'}`} />

          <Tooltip
            TransitionComponent={Zoom}
            disableFocusListener
            title={
              encoding === "base64"
                ? `This NFT is fully stored on the Bitshares blockchain!`
                : `This NFT may not be stored fully on chain.`
              }
          >
            <Chip className={classes.chip} label={`File encoding: ${encoding ? encoding : '???'}`} />
          </Tooltip>

          <Tooltip
            TransitionComponent={Zoom}
            disableFocusListener
            title={
              precision === 0
                ? `With a precision of 0, "${short_name}" is a non-fungible token!`
                : `Due to not having a precision of 0, this is a fungible token.`
              }
          >
            <Chip className={classes.chip} label={`Precision: ${precision}`} />
          </Tooltip>

          <Tooltip
            TransitionComponent={Zoom}
            disableFocusListener
            title={
              issuerName && issuerName === 'null-account'
                ? `Asset ownership has been "burned" by being sent to "null-account"; this NFT's settings are now final.`
                : `Warning: Asset ownership has not been transfered to "null-account" yet; the settings and quantity issued could change after purchase.`
            }
          >
            <Chip className={classes.chip} color={issuerName && issuerName === 'null-account' ? 'primary' : 'secondary'} label={`Asset issuer: ${issuerName}`} />
          </Tooltip>
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
            flagChips && flagChips.length
              ? flagChips
              : 'No flags are currently enabled.'
          }
        </TabPanel>
        <TabPanel value={value} index={3}>
          {
            permissionChips && permissionChips.length
              ? permissionChips
              : 'All permissions have been disabled.'
          }
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TextareaAutosize aria-label={"signature"} rowsMin={5} style={{'minWidth': '100%'}} defaultValue={nft_signature ? nft_signature : undefined} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <TextareaAutosize aria-label={"elasticSearchData"} rowsMin={5} rowsMax={20} style={{'minWidth': '100%'}} defaultValue={esDetails ? JSON.stringify(esDetails) : 'N/A'} />
        </TabPanel>
        <TabPanel value={value} index={6}>

            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className={classes.share}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <TelegramShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className={classes.share}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <LinkedinShareButton url={shareUrl} className={classes.share} >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <RedditShareButton
              url={shareUrl}
              title={title}
              windowWidth={660}
              windowHeight={460}
              className={classes.share}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>

            <TumblrShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <TumblrIcon size={32} round />
            </TumblrShareButton>

            <LivejournalShareButton
              url={shareUrl}
              title={title}
              description={shareUrl}
              className={classes.share}
            >
              <LivejournalIcon size={32} round />
            </LivejournalShareButton>

            <MailruShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <MailruIcon size={32} round />
            </MailruShareButton>

            <EmailShareButton
              url={shareUrl}
              subject={title}
              body="body"
              className={classes.share}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>

            <ViberShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <ViberIcon size={32} round />
            </ViberShareButton>

            <WorkplaceShareButton
              url={shareUrl}
              quote={title}
              className={classes.share}
            >
              <WorkplaceIcon size={32} round />
            </WorkplaceShareButton>

            <LineShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <LineIcon size={32} round />
            </LineShareButton>

            <PocketShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <PocketIcon size={32} round />
            </PocketShareButton>

            <InstapaperShareButton
              url={shareUrl}
              title={title}
              className={classes.share}
            >
              <InstapaperIcon size={32} round />
            </InstapaperShareButton>

            <HatenaShareButton
              url={shareUrl}
              title={title}
              windowWidth={660}
              windowHeight={460}
              className={classes.share}
            >
              <HatenaIcon size={32} round />
            </HatenaShareButton>

        </TabPanel>
      </Paper>
    </Grid>
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
