import {useTheme} from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import useToastStore from '../../stores/useToastStore';

const Toasts = () => {
  const theme = useTheme();
  const toast = useToastStore(s => s.toast);
  const action = useToastStore(s => s.action);
  const clearToast = useToastStore(s => s.clearToast);

  return (
    <Snackbar
      sx={{bottom: theme.spacing(8)}}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      open={!!toast}
      message={toast}
      onClose={clearToast}
      action={action}
    />
  );
};

export default Toasts;
