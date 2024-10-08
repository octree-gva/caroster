import {PropsWithChildren} from 'react';
import {useTranslation} from 'next-i18next';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Transition from './Transition';

interface Props {
  open: boolean;
  cancel: () => void;
  onSubmit: () => Promise<void>;
  disabled?: boolean;
  title: string;
  action?: string;
}

const FormDialog = ({
  open,
  cancel,
  onSubmit,
  disabled,
  title,
  action,
  children,
}: PropsWithChildren<Props>) => {
  const {t} = useTranslation();

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={cancel}
      TransitionComponent={Transition}
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="text" onClick={cancel}>
            {t('generic.cancel')}
          </Button>
          <Button type="submit" variant="contained" disabled={disabled}>
            {action || t('generic.add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
