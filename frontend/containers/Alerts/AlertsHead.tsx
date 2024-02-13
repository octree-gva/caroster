import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Toggle from '../../components/Toggle/index';
import {t} from 'i18next';

interface Props {
  handleToggle: () => void;
  checked: boolean;
}

const AlertsHeader = ({handleToggle, checked}: Props) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h5">{t('alert.title')}</Typography>
      <FormControlLabel
        control={<Toggle activate={handleToggle} checked={checked} />}
        label=""
        sx={{m: 0}}
      />
    </Box>
  );
};

export default AlertsHeader;
