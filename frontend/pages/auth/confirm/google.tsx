import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useTranslation, Trans} from 'next-i18next';
import {useState} from 'react';
import pageUtils from '../../../lib/pageUtils';
import CommonConfirm from '../../../layouts/ConfirmLayout';
import {useUpdateMeMutation} from '../../../generated/graphql';
import router from 'next/router';
import useSettings from '../../../hooks/useSettings';
import moment from 'moment';

const Confirm = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const settings = useSettings();
  const [updateMe] = useUpdateMeMutation();

  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [tosConsent, setTosConsent] = useState(false);

  const onSubmit = async () => {
    const tosAcceptationDate = tosConsent ? moment().toISOString() : null;
    await updateMe({
      variables: {userUpdate: {newsletterConsent, tosAcceptationDate}},
    });
    router.push('/dashboard');
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
        sx={{width: '100%', my: 2, mx: 0}}
        control={
          <Checkbox
            sx={{p: 0, mr: 2}}
            color="primary"
            value={newsletterConsent}
            onChange={({target: {checked = false}}) =>
              setNewsletterConsent(checked)
            }
          />
        }
        label={t('signup.newsletter.consent')}
      />
      <FormControlLabel
        sx={{width: '100%', my: 2, mx: 0}}
        label={
          <Trans
            i18nKey="signup.tos.consent"
            components={{
              'tos-link': <a href={settings.tos_link} target="_blank" />,
              'data-privacy-link': (
                <a href={settings.tos_link} target="_blank" />
              ),
            }}
          />
        }
        control={
          <Checkbox
            sx={{p: 0, mr: 2}}
            value={tosConsent}
            onChange={e => setTosConsent(e.target.checked)}
          />
        }
      />
      <Box sx={{textAlign: 'center'}} mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={onSubmit}
          disabled={!tosConsent}
        >
          {t('generic.confirm')}
        </Button>
      </Box>
    </CommonConfirm>
  );
};

export default Confirm;

export const getServerSideProps = pageUtils.getServerSideProps();
