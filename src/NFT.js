import React, {useState} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

const { TabPanel, a11yProps } = require("./tabs");
const { useQueryHook } = require("./reactQuery");

const { getImage, getPngDimensions } = require("./images");

const queryClient = new QueryClient();

function DisplayedNFT (properties) {
  let dataProps = properties.data;
  let id = dataProps.id;
  let issuer = dataProps.issuer;
  let precision = dataProps.precision;
  let symbol = dataProps.symbol;
  let options = dataProps.options;
  let max_supply = options.max_supply;

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

  let permissions = esDetails ? esDetails.permissions : undefined;
  let asset_flags = esDetails ? esDetails.flags : undefined;
  let dynamic_asset_data = esDetails ? esDetails.dynamic_asset_data : undefined;
  let current_supply = dynamic_asset_data ? dynamic_asset_data.current_supply : undefined;

  // Asset Description Langauge
  let description = JSON.parse(options.description);
  let main = description.main;
  let market = description.market;
  let short_name = description.short_name;

  // Keys expected for type NFT/ART:
  let nft_object = description.nft_object;
  let nft_signature = description.nft_signature;

  // NFT Object
  // Core keys:
  let type = nft_object.type ? nft_object.type : undefined;
  let attestation = nft_object.attestation ? nft_object.attestation : undefined;
  let sig_pubkey_or_address = undefined;
  if (nft_object.sig_pubkey_or_address) {
    sig_pubkey_or_address = nft_object.sig_pubkey_or_address;
  } else  if (nft_object.pubkeyhex) {
    sig_pubkey_or_address = nft_object.pubkeyhex;
  }

  let title = nft_object.title ? nft_object.title : undefined;
  let artist = nft_object.artist ? nft_object.artist : undefined;
  let narrative = nft_object.narrative ? nft_object.narrative : undefined;
  let encoding = nft_object.encoding ? nft_object.encoding : undefined;

  let { image, imgURL } = getImage(nft_object); // retrieving best match media key

  // Optional and Proposed Keys:
  let tags = nft_object.tags ? nft_object.tags.split(",") : undefined;
  let nft_flags = nft_object.flags ? nft_object.flags.split(",") : undefined;
  let acknowledgments = nft_object.acknowledgments ? nft_object.acknowledgments : undefined;
  let license = nft_object.license ? nft_object.license : undefined;
  let holder_license = nft_object.holder_license ? nft_object.holder_license : undefined;
  let password_multihash = nft_object.password_multihash ? nft_object.password_multihash : undefined;

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
    media: {
      maxWidth: '100%'
    },
    root: {
      textAlign: 'center'
    },
    a: {
      color: theme.palette.text.secondary,
      textDecoration: 'none'
    },
    share: {
      margin: theme.spacing(0.25)
    },
    button: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const flagChips = asset_flags
    ? Object.keys(asset_flags).map(
        (flag) => {
          const flagValue = asset_flags[flag];
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

  const enabledPermissionTips = {
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

  const disabledPermissionTips = {
    charge_market_fee : "No market fees can be charged for this asset; only BTS fees will be required.",
    white_list : "There is no approved list of markets for this asset. Feel free to trade it for anything on the Bitshares decentralized exchange.",
    override_authority : "The asset issuer is unable to transfer this NFT back to themselves.",
    transfer_restricted : "This asset's transfers are unrestricted.",
    disable_force_settle: "This asset cannot be force settled.",
    global_settle: "This asset cannot be globally settled.",
    disable_confidential: "Confidential transactions of this asset are permanently possible.",
    witness_fed_asset: "The witnesses cannot feed a price for this asset.",
    committee_fed_asset: "The committee cannot feed a price for this asset.",
  };

  const permissionChips = permissions
    ? Object.keys(permissions).map(
        (permission) => {
          const permissionValue = permissions[permission];
          return <Tooltip
                  TransitionComponent={Zoom}
                  disableFocusListener
                  title={
                    permissionValue === true || permissionValue === 'true'
                      ? enabledPermissionTips[permission]
                      : disabledPermissionTips[permission]
                  }
                >
                  <Chip
                    className={classes.chip}
                    avatar={<Avatar>{permissionValue === true || permissionValue === 'true'  ? '✔' : '❌'}</Avatar>}
                    label={permission.replace(/_/g, ' ')}
                   />
                </Tooltip>;

        }
      )
    : undefined;

  const tagChips = tags
    ? tags.map((tag) => {
      return <Chip
        className={classes.chip}
        label={tag}
       />
      })
    : undefined;

  const shareUrl = `https://btsnft.onrender.com/${symbol}`;

  return (
    <Grid item xs={12} style={{'paddingBottom': '25px'}} key={symbol + "NFT"}>
      <Paper className={classes.paper} id={id}>
        <Typography gutterBottom variant="h4" component="h1">
          "<Link to={`/nft/${symbol}`} className={classes.a}>{short_name}</Link>" by {artist}
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
            <Tab label="Tags" {...a11yProps(2)} />
            <Tab label="Share" {...a11yProps(3)} />
            <Tab label="Where to buy" {...a11yProps(4)} />
            <Tab label="Flags" {...a11yProps(5)} />
            <Tab label="Permissions" {...a11yProps(6)} />
            <Tab label="Signature" {...a11yProps(7)} />
            <Tab label="License" {...a11yProps(8)} />
            <Tab label="JSON Data" {...a11yProps(9)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} id="NFT">
          <Typography variant="body1" gutterBottom>
            <b>Attestation</b>: "{attestation}"
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Narrative</b>: "{narrative}"
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Acknowledgments</b>: "{acknowledgments ? acknowledgments : 'N/A'}"
          </Typography>
        </TabPanel>

        <TabPanel value={value} index={1} id="Asset">
          <Chip className={classes.chip} label={`Asset name: ${symbol ? symbol : '???'}`} />
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
        </TabPanel>

        <TabPanel value={value} index={2} id="Tags">
          {
            tagChips && tagChips.length
              ? tagChips
              : <Typography variant="body1" gutterBottom>No topic/interest tags</Typography>
          }
          {
            nft_flags && nft_flags.length
              ? nft_flags
              : <Typography variant="body1" gutterBottom>No NFT tags</Typography>
          }
        </TabPanel>

        <TabPanel value={value} index={3} id="Share">

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

        <TabPanel value={value} index={4} id="Market">

          <Typography variant="body1" gutterBottom>
            The NFT titled "{title}" ({symbol}) can be traded/transfered on the Bitshares decentralized exchange
          </Typography>

          <a href={`https://wallet.bitshares.org/#/market/${symbol}_${market ? market : 'BTS'}`}>
            <Button className={classes.button} variant="contained">Bitshares.org</Button>
          </a>
          <a href={`https://ex.xbts.io/market/${symbol}_${market ? market : 'BTS'}`}>
            <Button className={classes.button} variant="contained">XBTS.io</Button>
          </a>
          <a href={`https://www.gdex.io/market/${symbol}_${market ? market : 'BTS'}`}>
            <Button className={classes.button} variant="contained">GDEX.io</Button>
          </a>
          <Tooltip
            TransitionComponent={Zoom}
            disableFocusListener
            title={`Within the desktop app search for the UIA "${symbol}"`}
          >
            <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
              <Button className={classes.button} variant="contained">Desktop app</Button>
            </a>
          </Tooltip>

        </TabPanel>

        <TabPanel value={value} index={5} id="Flags">
          {
            flagChips && flagChips.length
              ? flagChips
              : 'No flags are currently enabled.'
          }
        </TabPanel>

        <TabPanel value={value} index={6} id="Permissions">
          {
            permissionChips && permissionChips.length
              ? permissionChips
              : 'All permissions have been disabled.'
          }
        </TabPanel>

        <TabPanel value={value} index={7} id="Signature">
          <Typography variant="body1" gutterBottom>
            <b>Signature</b>
          </Typography>
          <TextareaAutosize aria-label={"signature"} rowsMin={5} style={{'minWidth': '100%'}} defaultValue={nft_signature ? nft_signature : 'N/A'} />
          <Typography variant="body1" gutterBottom>
            <b>Signature pubkey/address</b>
          </Typography>
          <TextareaAutosize aria-label={"sig_pubkey_or_address"} rowsMin={5} style={{'minWidth': '100%'}} defaultValue={sig_pubkey_or_address} />
          <Typography variant="body1" gutterBottom>
            <b>Password multihash</b>
          </Typography>
          <TextareaAutosize aria-label={"password_multihash"} rowsMin={5} style={{'minWidth': '100%'}} defaultValue={password_multihash} />
        </TabPanel>

        <TabPanel value={value} index={8} id="License">
          <Typography variant="body1" gutterBottom>
            <b>License: </b>
            {
              license
                ? license
                : 'The license under which this NFT has been released has not been provied.'
            }
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Holder license: </b>
            {
              holder_license
                ? holder_license
                : 'Holder license information has not been provided.'
            }
          </Typography>

        </TabPanel>

        <TabPanel value={value} index={9} id="JSON">
          <TextareaAutosize aria-label={"elasticSearchData"} rowsMin={5} rowsMax={20} style={{'minWidth': '100%'}} defaultValue={esDetails ? JSON.stringify(esDetails) : 'N/A'} />
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
