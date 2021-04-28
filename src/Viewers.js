import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Viewers(properties) {
  const classes = useStyles();
  return ([
    <Grid item xs={12} key={"Viewer grid"}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          NFT viewers
        </Typography>
        <Typography variant="body1" gutterBottom>
          Check out these trusted Bitshares NFT viewers!
        </Typography>
        <a href={`http://nft.iamredbar.com/`}>
          <Button size="small" className={classes.button} variant="contained">Art-o-Matic</Button>
        </a>
        <a href={`https://alguienalli.github.io/`}>
          <Button size="small" className={classes.button} variant="contained">Alguien's Bitshares NFT Explorer</Button>
        </a>
      </Paper>
    </Grid>,
    <Grid item xs={12} key={"Viewer grid"}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          Blockchain explorers
        </Typography>
        <Typography variant="body1" gutterBottom>
          Verify NFT info and discover NFT trading rates
        </Typography>
        <a href={`https://wallet.bitshares.org/#/explorer/assets`}>
          <Button size="small" className={classes.button} variant="contained">Bitshares.org</Button>
        </a>
        <a href={`https://ex.xbts.io/explorer/assets`}>
          <Button size="small" className={classes.button} variant="contained">XBTS.io</Button>
        </a>
        <a href={`https://www.gdex.io/explorer/assets`}>
          <Button size="small" className={classes.button} variant="contained">GDEX.io</Button>
        </a>
        <a href={`https://bts.ai/`}>
          <Button size="small" className={classes.button} variant="contained">BTS.AI</Button>
        </a>
        <a href={`https://api.testnet.bitshares.ws/docs`}>
          <Button size="small" className={classes.button} variant="contained">Insight</Button>
        </a>
      </Paper>
    </Grid>
  ]);
}
