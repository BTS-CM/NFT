import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Chip from '@material-ui/core/Chip';

const { useQueryHook } = require("./reactQuery");

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

export default function IssuerDetails(properties) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const issuer = properties.issuer;
  const issuerDetails = properties.issuerDetails;
  const setIssuerDetails = properties.setIssuerDetails;

  //const [issuerDetails, setIssuerDetails] = useState();

  useQueryHook(
    `https://api.bitshares.ws/openexplorer/object?object=${issuer}`,
    //`http://localhost:8082/proxy/openexplorer/object?object=${issuer}`,
    `getissuerName_${issuer}`,
    setIssuerDetails,
    {
      enabled: !!issuer,
    }
  );

  let issuerName = issuerDetails ? issuerDetails.name : undefined;

  return (
    <Tooltip
      TransitionComponent={Zoom}
      disableFocusListener
      title={
        issuerName && issuerName === 'null-account'
          ? i18n.t('nft:asset.asset_ownership_burned')
          : i18n.t('nft:asset.asset_ownership_warning')
      }
    >
      <Chip className={classes.chip} color={issuerName && issuerName === 'null-account' ? 'primary' : 'secondary'} label={`${i18n.t('nft:asset.issuer')}: ${issuerName}`} />
    </Tooltip>
  );
}
