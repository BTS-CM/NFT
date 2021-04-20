import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function About(properties) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <p>
        Bitshares was the first DPoS blockchain technology with self-governance, 3 seconds processing time and in-built decentralized financial platform. Combining ethics, responsibility, innovations, fairness, knowledge and 6 years of experience to manage a safe, stable and scalable ecosystem. <a href="https://bitshares.org">Read more about Bitshares!</a>
      </p>
      <p>
        Non-Fungible Tokens (NFTs) can easily be issued by anyone on the Bitshares blockchain by following the <a href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification">Bitshares NFT Specification</a>. Feel free to fork this NFT viewer for your own Bitshares based NFT gallery.
      </p>
      <p>
        Fees on the Bitshares blockchain are <a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">considerably lower than competitor platforms</a>. These fees can be further reduced by purchasing a life-time membership as well as issuing sub-assets like "gallery_name.nft_name".
      </p>
    </Paper>
  );
}
