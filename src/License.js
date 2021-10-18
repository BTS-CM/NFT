import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import ReactGA from 'react-ga4';
ReactGA.initialize('G-CTZ1V9EXWY');

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

export default function License(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  useEffect(() => {
    ReactGA.pageview('License')
  }, []);

  return (
    <Paper className={classes.paper}>
      <Typography variant="body1" gutterBottom>
        {i18n.t('license:type')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {i18n.t('license:copyright')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {i18n.t('license:permission')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {i18n.t('license:notice')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {i18n.t('license:disclaimer')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <a className={classes.a} href="https://github.com/BTS-CM/NFT">{i18n.t('license:repo')}</a>
      </Typography>
    </Paper>
  );
}
