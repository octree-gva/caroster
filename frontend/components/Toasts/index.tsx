import Snackbar from '@material-ui/core/Snackbar';
import useToastStore from '../../stores/useToastStore';

const Toasts = () => {
  const toast = useToastStore(s => s.toast);
  const clearToast = useToastStore(s => s.clearToast);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
      open={!!toast}
      message={toast}
      onClose={clearToast}
    />
  );
};

export default Toasts;
