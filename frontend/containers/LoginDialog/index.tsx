import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import {useTranslation} from 'next-i18next';
import LoginForm from '../LoginForm';
import {useState} from 'react';
import {setCookie} from '../../lib/cookies';

type Props = {
  open: boolean;
  toggle: () => void;
  redirectPath: string;
  title?: string;
  content?: string;
};

const LoginDialog = (props: Props) => {
  const {t} = useTranslation();
  const {
    open,
    toggle,
    redirectPath,
    title = t`signin.title`,
    content = '',
  } = props;
  const [sent, setSent] = useState(false);

  const onSend = () => {
    setSent(true);
    setCookie('redirectPath', redirectPath);
  };

  return (
    <Dialog open={open} onClose={toggle} maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {!sent && (
          <>
            {content && <Typography mb={2}>{content}</Typography>}
            <LoginForm onSend={onSend} />
            <Button
              fullWidth
              sx={{mt: 2}}
              variant="outlined"
              onClick={toggle}
            >{t`generic.cancel`}</Button>
          </>
        )}
        {sent && (
          <>
            <Typography mb={2}>{t`signin.check_email`}</Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={toggle}
            >{t`generic.close`}</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
