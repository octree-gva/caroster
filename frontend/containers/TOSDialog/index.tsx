import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useEffect, useReducer, useState} from 'react';
import {useTranslation, Trans} from 'next-i18next';
import useSettings from '../../hooks/useSettings';

const STORAGE_KEY = 'TOS_ACCEPTED';

const TOSDialog = () => {
  const {t} = useTranslation();
  const settings = useSettings();
  const session = useSession();
  const [accepted, setAccepted] = useState(false);
  const [showDialog, toggleDialog] = useReducer(i => !i, false);

  const onConfirm = () => {
    toggleDialog();
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  };

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) toggleDialog();
  }, []);

  if (session.status !== 'unauthenticated') return null;

  return (
    <Dialog open={showDialog} fullWidth maxWidth="xs">
      <DialogTitle>{t`signup.tos.title`}</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" gap={4}>
          <Typography>
            <Trans
              i18nKey="signup.tos.consent"
              components={{
                'tos-link': <a href={settings.tos_link} target="_blank" />,
                'data-privacy-link': (
                  <a href={settings.data_policy_link} target="_blank" />
                ),
              }}
            />
          </Typography>
          <Checkbox
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!accepted}
          onClick={onConfirm}
          fullWidth
        >{t`signup.tos.button`}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TOSDialog;
