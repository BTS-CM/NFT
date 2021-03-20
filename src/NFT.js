import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function NFT(properties) {
    const classes = useStyles();
    let Apis = properties.Apis;
    let data = properties.data;

    let id = data.id;
    let symbol = data.symbol;
    let precision = data.precision;

    let issuer = data.issuer;
    //let issuerDetails = async () => await Apis.db.get_objects([data.issuer]);
    let options = data.options;
    let max_supply = options.max_supply;

    let description = JSON.parse(options.description); // json data
    let main = description.main;
    let market = description.market;
    let nft_signature = description.nft_signature;
    let short_name = description.short_name;

    let nft_object = description.nft_object;
    let artist = nft_object.artist;
    let attestation = nft_object.attestation;
    let encoding = nft_object.encoding;
    let image_png = nft_object.image_png;
    let narrative = nft_object.narrative;
    let title = nft_object.title;
    let type = nft_object.type;


    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1>"{short_name}" by {artist}</h1>
          {
            encoding && encoding === "base64"
              ? <a href={"data:image/png;base64," + image_png}>
                  <img src={"data:image/png;base64," + image_png} alt={short_name + " image"} />
                </a>
              : undefined
          }
          <p>{main}</p>
          <Divider />
          <Paper className={classes.paper}>
            <code>Signature: {nft_signature}</code>
            <p>Attestation: "{attestation}"</p>
            <a href={"https://wallet.bitshares.org/#/asset/" + symbol} style={{'padding': '5px'}}>
              <Button variant="contained">{symbol}</Button>
            </a>
            <a href={`https://wallet.bitshares.org/#/market/${symbol}_${market}`}>
              <Button variant="contained">Make Offer</Button>
            </a>
          </Paper>
        </Paper>
      </Grid>
    );

    /*
      "{
        \"main\":\"Just Another One is a non-fungible artwork token by Some Ol' Artist, deployed on the BitShares blockchain.\",
        \"market\":\"MKUU\",
        \"nft_object\":
          {
            \"artist\":\"Some Ol' Artist\",
            \"attestation\":\"I, Some Ol' Artist, originator of the work herein, hereby commit this piece of art to the BitShares blockchain, to live as the token named MKUU.NFT00003, and attest that no prior tokenization of this art exists or has been authorized by me. The work is original, and is fully mine to dedicate in this way. May it preserve until the end of time.\",
            \"encoding\":\"base64\",
            \"image_png\":\"",
            \"narrative\":\"It's what you put in the dish, that counts. You can grow anything. And what it becomes... only time will tell.\",
            \"title\":\"Just Another One\",
            \"type\":\"NFT/ART\"
          },
        \"nft_signature\":\"ADD_SIG_HERE_WHEN_SIGNED\",
        \"short_name\":\"Just Another One\"
      }",
    */



}
