import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import {useTranslation} from 'react-i18next';
import CommonConfirm from '../../../layouts/ConfirmLayout';
import pageUtils from '../../../lib/pageUtils';

const Confirm = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <CommonConfirm>
      <Typography variant="subtitle1" align="center">
        {t('confirm.creating')}
      </Typography>
      <Typography variant="h5" align="center">
        {t('confirm.title')}
      </Typography>
      <Typography
        align="center"
        sx={{margin: theme.spacing(5, 0)}}
      >
        <Icon fontSize="large">mail</Icon>
      </Typography>
      <Typography
        sx={{margin: theme.spacing(5, 0)}}
        variant="body2"
        align="center"
      >
        {t('confirm.text')}
      </Typography>
    </CommonConfirm>
  );
};

export default Confirm;

export const getServerSideProps = pageUtils.getServerSideProps();
