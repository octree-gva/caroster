import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useTranslation, Trans} from 'next-i18next';
import {useMemo, useState} from 'react';
import pageUtils from '../../lib/pageUtils';
import CommonConfirm from '../../layouts/ConfirmLayout';
import {useUpdateMeMutation} from '../../generated/graphql';
import useSettings from '../../hooks/useSettings';
import moment from 'moment';
import {useSession} from 'next-auth/react';
import {TextField, useMediaQuery} from '@mui/material';
import theme from '../../theme';

const Confirm = () => {
  const {t} = useTranslation();
  const settings = useSettings();
  const [updateMe] = useUpdateMeMutation();
  const session = useSession();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const sessionNames = session?.data?.token?.name?.split(' ') || ['', ''];

  const [firstname, setFirstname] = useState(sessionNames[0]);
  const [lastname, setLastname] = useState(sessionNames[1]);
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [tosConsent, setTosConsent] = useState(false);
  const canConfirm = useMemo(
    () => firstname?.length > 1 && lastname?.length > 1 && tosConsent,
    [firstname, lastname, tosConsent]
  );

  const onSubmit = async () => {
    const tosAcceptationDate = tosConsent ? moment().toISOString() : null;
    await updateMe({
      variables: {
        userUpdate: {
          newsletterConsent,
          tosAcceptationDate,
          firstName: firstname,
          lastName: lastname,
        },
      },
    });
    window.location.href = '/dashboard';
  };

  return (
    <CommonConfirm>
      <Typography variant="h6" align="center">
        {t('signup.create')}
      </Typography>
      <Typography variant="h5" align="center">
        {t('confirm.google.title')}
      </Typography>
      <Box
        mt={3}
        mb={2}
        display="flex"
        gap={2}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <TextField
          label={t`signup.firstName`}
          variant="outlined"
          size="small"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
          fullWidth
        />
        <TextField
          label={t`signup.lastName`}
          variant="outlined"
          size="small"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          fullWidth
        />
      </Box>
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
        sx={{width: '100%', mx: 0}}
        label={
          <Trans
            i18nKey="signup.tos.consent"
            components={{
              'tos-link': <a href={settings.tos_link} target="_blank" />,
              'data-privacy-link': (
                <a href={settings.data_policy_link} target="_blank" />
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
          disabled={!canConfirm}
        >
          {t('generic.confirm')}
        </Button>
      </Box>
    </CommonConfirm>
  );
};

export default Confirm;

export const getServerSideProps = pageUtils.getServerSideProps();
