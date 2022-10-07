import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import CommonConfirm from '../../../layouts/ConfirmLayout';
import pageUtils from '../../../lib/pageUtils';

const Confirm = () => {
  const {t} = useTranslation();
  const {margins} = useStyles();

  return (
    <CommonConfirm>
      <Typography variant="overline" component="h5" align="center">
        {t('confirm.title')}
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        align="center"
      >
        {t('confirm.title')}
      </Typography>
      <Typography align="center" className={margins} component="div">
        <Icon fontSize="large">mail</Icon>
      </Typography>
      <Typography
        className={margins}
        variant="body2"
        color="textSecondary"
        component="p"
        align="center"
      >
        {t('confirm.text')}
      </Typography>
    </CommonConfirm>
  );
};

const useStyles = makeStyles(theme => ({
  margins: {
    margin: theme.spacing(5, 0),
  },
}));

export default Confirm;

export const getServerSideProps = pageUtils.getServerSideProps();
