import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const AddPassengerButtons = ({toggleNewPassenger}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.addButtonsContainer}>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        startIcon={<Icon>person_add</Icon>}
        onClick={toggleNewPassenger}
      >
        {t('travel.passengers.add')}
      </Button>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  addButtonsContainer: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default AddPassengerButtons;
