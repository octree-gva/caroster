import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import pageUtils from '../../../lib/pageUtils';
import CommonConfirm from '../../../layouts/ConfirmLayout';
import {useUpdateMeMutation} from '../../../generated/graphql';
import useRedirectUrlStore from '../../../stores/useRedirectUrl';
import router from 'next/router';

const Confirm = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [updateMe] = useUpdateMeMutation();
  const getRedirectUrl = useRedirectUrlStore(s => s.getRedirectUrl);
  const onSubmit = async () => {
    await updateMe({variables: {userUpdate: {newsletterConsent}}});
    const callbackUrl = getRedirectUrl() || '/';
    router.push(callbackUrl);
  };

  return (
    <CommonConfirm>
      <Typography variant="overline" component="h5" align="center">
        {t('signup.create')}
      </Typography>
      <Typography variant="h5" component="h2" align="center">
        {t('confirm.google.title')}
      </Typography>
      <Typography align="center" className={classes.margins} component="div">
        <Icon fontSize="large">mail</Icon>
      </Typography>
      <FormControlLabel
        className={classes.newsletter}
        control={
          <Checkbox
            className={classes.checkbox}
            color="primary"
            value={newsletterConsent}
            onChange={({target: {checked = false}}) =>
              setNewsletterConsent(checked)
            }
          />
        }
        label={t('signup.newsletter.consent')}
      />
      <Box className={classes.center}>
        <Button variant="contained" color="secondary" onClick={onSubmit}>
          {t('generic.confirm')}
        </Button>
      </Box>
    </CommonConfirm>
  );
};

const useStyles = makeStyles(theme => ({
  margins: {
    margin: theme.spacing(5, 0),
  },
  newsletter: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  checkbox: {
    padding: 0,
    marginRight: theme.spacing(2),
  },
  center: {
    textAlign: 'center',
  },
}));

export default Confirm;

export const getServerSideProps = pageUtils.getServerSideProps();
