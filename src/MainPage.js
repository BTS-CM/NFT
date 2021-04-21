import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

/*

function Gallery() {

  const [nfts, setNfts] = useState([]);
  const { status, data, error, isFetching } = useQuery('wsNFT', async () => {
    await Apis.instance("wss://node.testnet.bitshares.eu", true).init_promise;
    return await Apis.db.get_assets(art.map(asset => asset.name));
  });

  if (!nfts || !nfts.length) {
    if (data && !error) {
      setNfts(data.filter(x => x))
    }
  }

  return nfts && nfts.length > 0
    ? nfts.map(nft => <NFT apis={Apis} data={nft} key={nft.id + "_gallery"} />)
    : [];
}

*/

export default function MainPage(properties) {
  const classes = useStyles();
  return ([
    <Grid item xs={12} key={"Index page"}>
      <Paper className={classes.paper}>
        Primary hero element
      </Paper>
    </Grid>,
    <Grid item xs={12} key={"Index page"}>
      <Paper className={classes.paper}>
        Recently added NFT
      </Paper>
    </Grid>,
    <Grid item xs={6} key={"Index page"}>
      <Paper className={classes.leftPaper}>
        Issue an NFT on Bitshares
      </Paper>
    </Grid>,
    <Grid item xs={6} key={"Index page"}>
      <Paper className={classes.rightPaper}>
        Trade NFT on the Bitshares DEX
      </Paper>
    </Grid>,
    <Grid item xs={12} key={"Index page"}>
      <Paper className={classes.paper}>
        Gallery stats
      </Paper>
    </Grid>
  ]);
}
