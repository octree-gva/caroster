import Icon from '@mui/material/Icon';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

interface Props {
  getOnClickFunction: (addSelf: boolean) => () => void;
  canAddSelf: boolean;
  variant: 'waitingList' | 'travel';
  disabled?: boolean;
}

const AddPassengerButtons = ({
  getOnClickFunction,
  canAddSelf,
  variant,
  disabled,
}: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const addToLocale = {
    'waitingList': 'travel.passengers.add_to_waitingList',
    'travel': 'travel.passengers.add_to_travel'
  }

  const containerSx = {padding: theme.spacing(1), textAlign: 'center'};
  const textSx = {
    padding: theme.spacing(1, 8),
    [theme.breakpoints.down(440)]: {
      padding: theme.spacing(1, 4),
    },
    '& > .material-icons': {
      width: theme.spacing(3),
      textAlign: 'center',
      position: 'absolute',
      left: theme.spacing(4),
      marginRight: theme.spacing(1),
      [theme.breakpoints.down(440)]: {
        left: theme.spacing(1),
      },
    },
  };

  return (
    <Box sx={containerSx}>
      {canAddSelf && (
        <Box sx={containerSx}>
          <Button
            sx={textSx}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={getOnClickFunction(true)}
            disabled={disabled}
          >
            <Icon>person_add</Icon>
            {t('travel.passengers.add_me')}
          </Button>
        </Box>
      )}
      <Box sx={containerSx}>
        <Button
          sx={textSx}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={getOnClickFunction(false)}
          disabled={disabled}
        >
          <Icon>person_add</Icon>
          {t(addToLocale[variant])}
        </Button>
      </Box>
    </Box>
  );
};

export default AddPassengerButtons;
