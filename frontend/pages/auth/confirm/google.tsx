import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
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

const Confirm = () => {
  const theme = useTheme();
  const {t} = useTranslation();

  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [updateMe] = useUpdateMeMutation();
  const getRedirectUrl = useRedirectUrlStore(s => s.getRedirectUrl);
  const onSubmit = async () => {
    await updateMe({variables: {userUpdate: {newsletterConsent}}});
    const callbackUrl = getRedirectUrl() || '/dashboard';
    router.push(callbackUrl);
  };

  return (
    <CommonConfirm>
      <Typography variant="h6" align="center">
        {t('signup.create')}
      </Typography>
      <Typography variant="h5" align="center">
        {t('confirm.google.title')}
      </Typography>
      <Typography align="center" sx={{margin: theme.spacing(5, 0)}}>
        <Icon fontSize="large">mail</Icon>
      </Typography>
      <FormControlLabel
        sx={{width: '100%', margin: theme.spacing(2, 0)}}
        control={
          <Checkbox
            sx={{padding: 0, marginRight: theme.spacing(2)}}
            color="primary"
            value={newsletterConsent}
            onChange={({target: {checked = false}}) =>
              setNewsletterConsent(checked)
            }
          />
        }
        label={t('signup.newsletter.consent')}
      />
      <Box sx={{textAlign: 'center'}}>
        <Button variant="contained" color="secondary" onClick={onSubmit}>
          {t('generic.confirm')}
        </Button>
      </Box>
    </CommonConfirm>
  );
};

export default Confirm;

export const getServerSideProps = pageUtils.getServerSideProps();
