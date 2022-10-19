import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import pageUtils from '../../../lib/pageUtils';
import CommonConfirm from '../../../layouts/ConfirmLayout';
import {useUpdateMeMutation} from '../../../generated/graphql';
import useRedirectUrlStore from '../../../stores/useRedirectUrl';
import router from 'next/router';

const PREFIX = 'Confirm';

const classes = {
  margins: `${PREFIX}-margins`,
  newsletter: `${PREFIX}-newsletter`,
  checkbox: `${PREFIX}-checkbox`,
  center: `${PREFIX}-center`
};

const StyledCommonConfirm = styled(CommonConfirm)((
  {
    theme
  }
) => ({
  [`& .${classes.margins}`]: {
    margin: theme.spacing(5, 0),
  },

  [`& .${classes.newsletter}`]: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },

  [`& .${classes.checkbox}`]: {
    padding: 0,
    marginRight: theme.spacing(2),
  },

  [`& .${classes.center}`]: {
    textAlign: 'center',
  }
}));

const Confirm = () => {
  const {t} = useTranslation();

  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [updateMe] = useUpdateMeMutation();
  const getRedirectUrl = useRedirectUrlStore(s => s.getRedirectUrl);
  const onSubmit = async () => {
    await updateMe({variables: {userUpdate: {newsletterConsent}}});
    const callbackUrl = getRedirectUrl() || '/';
    router.push(callbackUrl);
  };

  return (
    <StyledCommonConfirm>
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
    </StyledCommonConfirm>
  );
};

export default Confirm;

export const getServerSideProps = pageUtils.getServerSideProps();
