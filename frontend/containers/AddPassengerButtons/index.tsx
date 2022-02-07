import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

interface Props {
  getOnClickFunction: (addSelf: boolean) => () => void;
  canAddSelf: boolean;
  variant: 'waitingList' | 'travel';
}

const AddPassengerButtons = ({getOnClickFunction, canAddSelf, variant}: Props) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.addButtonsContainer}>
      {canAddSelf && (
        <Box className={classes.addButtonsContainer}>
          <Button
            className={classes.textContainer}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={getOnClickFunction(true)}
          >
            <Icon>person_add</Icon>
            {t('travel.passengers.add_me')}
          </Button>
        </Box>
      )}
      <Box className={classes.addButtonsContainer}>
        <Button
          className={classes.textContainer}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={getOnClickFunction(false)}
        >
          <Icon>person_add</Icon>
          {t(`travel.passengers.add_to_${variant}`)}
        </Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  addButtonsContainer: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  textContainer: {
    padding: theme.spacing(1, 8),
    [theme.breakpoints.down(440)]: {
      padding: theme.spacing(1, 4),
    },
    '& > .MuiButton-label': {
      '& > .material-icons': {
        width: theme.spacing(3),
        textAlign: 'center',
        position: 'absolute',
        left: theme.spacing(4),
        [theme.breakpoints.down(440)]: {
          left: theme.spacing(1),
        },
      },
    },
  },
}));

export default AddPassengerButtons;
