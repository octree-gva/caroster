import {
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LoginGoogle from '../LoginGoogle';
import {useTranslation} from 'next-i18next';
import {useState} from 'react';
import {useSendMagicLinkMutation} from '../../generated/graphql';

type Props = {
  error?: string;
  showGoogleAuth?: boolean;
  onSend?: () => void;
};

const LoginForm = (props: Props) => {
  const {error, showGoogleAuth, onSend} = props;
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [magicLinkError, setMagicLinkError] = useState<string>(null);
  const [sendMagicLink] = useSendMagicLinkMutation();

  const handleSubmit = async () => {
    try {
      setMagicLinkError(null);
      if (email) await sendMagicLink({variables: {email, lang: i18n.language}});
      setSent(true);
      onSend?.();
    } catch (error) {
      console.error(error);
      if (error.message === 'GoogleAccount') setMagicLinkError(error.message);
    }
  };

  return (
    <Stack spacing={2}>
      {(error || magicLinkError) && (
        <FormHelperText error sx={{textAlign: 'center'}}>
          {t(errorsMap[error || magicLinkError])}
        </FormHelperText>
      )}
      {!sent && (
        <>
          <TextField
            label={t`signin.email`}
            fullWidth
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={!email}
            onClick={handleSubmit}
          >
            {t('signin.sendLink')}
          </Button>
          {showGoogleAuth && (
            <>
              <Typography align="center">{t('signin.or')}</Typography>
              <LoginGoogle />
            </>
          )}
        </>
      )}
      {sent && (
        <Typography
          variant="body2"
          align="center"
          pt={2}
        >{t`signin.check_email`}</Typography>
      )}
    </Stack>
  );
};

const errorsMap = {
  CredentialsSignin: 'signin.errors.CredentialsSignin',
  GoogleAccount: 'signin.errors.GoogleAccount',
};

export default LoginForm;
