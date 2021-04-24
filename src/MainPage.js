import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RecentNFTs from "./RecentNFTs";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  leftPaper: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  rightPaper: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  left: {
    marginRight: theme.spacing(1),
  },
  center: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  right: {
    marginLeft: theme.spacing(1)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function diff_years(dt2, dt1) {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));

}

export default function MainPage(properties) {
  const classes = useStyles();
  const art = properties && properties.art ? properties.art : [];


  let genesis = new Date(2013,6,2);
  let now = new Date();

  return ([
    <Grid item xs={12} key={"Index recent NFT"}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          Recently added NFT
        </Typography>
        <RecentNFTs {...properties} />
      </Paper>
    </Grid>,
    <Grid item xs={6} key={"Index artist prompt"}>
      <Paper className={classes.leftPaper}>
        <Typography gutterBottom variant="h5">
          Calling all artists!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you interested in monetizing your art?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Issue your NFT on the Bitshares decentralized exchange!
        </Typography>
      </Paper>
    </Grid>,
    <Grid item xs={6} key={"Index gallery prompt"}>
      <Paper className={classes.rightPaper}>
        <Typography gutterBottom variant="h5">
          Prospective NFT gallery owners
        </Typography>
        <Typography variant="body1" gutterBottom>
          This gallery is <a href="https://github.com/BTS-CM/NFT">fully open-source</a> and <a href="/license">MIT licensed</a>; feel free to use it to create your own Bitshares NFT gallery.
        </Typography>
      </Paper>
    </Grid>,
    <Grid item xs={12} key={"Index trader prompt"}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          Interested in trading NFT on the Bitshares decentralized exchange?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Fees on the BTS DEX are <a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">considerably lower</a> than those on competitor platforms!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Neither this gallery nor the issuers of the NFTs displayed within this gallery will apply any additional overhead fees to your NFT trading.
        </Typography>
        <Typography variant="body1" gutterBottom>
          No KYC/AML restrictions are imposed on trading/transfers of NFT on the BTS DEX, unless trading against <a href="https://how.bitshares.works/en/master/bts_holders/tokens/eba.html">exchange backed assets</a>.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Find out <a href="https://how.bitshares.works/en/master/user_guide/create_account.html">how to create a Bitshares account</a> & get trading today!
        </Typography>
      </Paper>
    </Grid>,
    <Grid item xs={12} key={"Index trader prompt"}>
    </Grid>,
    <Grid item xs={4} key={"stats 1"}>
      <Card className={classes.left}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Quantity of NFT
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {art.length}
          </Typography>
        </CardContent>
      </Card>
    </Grid>,
    <Grid item xs={4} key={"stats 1"}>
      <Card className={classes.center}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Quantity of artists
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            1
          </Typography>
        </CardContent>
      </Card>
    </Grid>,
    <Grid item xs={4} key={"stats 1"}>
      <Card className={classes.right}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Years since Bitshares launched
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {
              diff_years(genesis, now) + " years"
            }
          </Typography>
        </CardContent>
      </Card>
    </Grid>

  ]);
}
