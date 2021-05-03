import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  a: {
    color: theme.palette.text.secondary
  }
}));

export default function About(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  return (
    <Paper className={classes.paper}>
      <p>
        {i18n.t('about:p1')}<a className={classes.a} href="https://bitshares.org">{i18n.t('about:a1')}</a>
      </p>
      <p>
        {i18n.t('about:p2')}<a className={classes.a} href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification">{i18n.t('about:a2')}</a>.{i18n.t('about:p3')}
      </p>
      <p>
        {i18n.t('about:p4')}<a className={classes.a} href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{i18n.t('about:a3')}</a>. {i18n.t('about:p5')}.
      </p>
    </Paper>
  );
}
