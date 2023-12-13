import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

interface Props {
  getOnClickFunction: (addSelf: boolean) => () => void;
  canAddSelf: boolean;
  registered: boolean;
  variant: 'waitingList' | 'travel';
  disabled?: boolean;
}

const ADD_TO_LOCALE = {
  waitingList: 'travel.passengers.add_to_waitingList',
  travel: 'travel.passengers.add_to_travel',
};

const AddPassengerButtons = ({
  getOnClickFunction,
  canAddSelf,
  registered,
  variant,
  disabled,
}: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();

  const containerSx = {padding: theme.spacing(1), textAlign: 'center'};
  const textSx = {
    padding: theme.spacing(1, 8),
    [theme.breakpoints.down(440)]: {
      padding: theme.spacing(1, 4),
    },
  };

  return (
    <Box sx={containerSx}>
      {canAddSelf && (
        <Box sx={containerSx}>
          <Button
            sx={textSx}
            variant="contained"
            color="primary"
            fullWidth
            onClick={getOnClickFunction(true)}
            disabled={registered}
          >
            {t(
              registered
                ? 'travel.passengers.registered'
                : 'travel.passengers.add_me'
            )}
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
          {t(ADD_TO_LOCALE[variant])}
        </Button>
      </Box>
    </Box>
  );
};

export default AddPassengerButtons;
