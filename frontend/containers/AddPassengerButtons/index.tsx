import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import usePermissions from '../../hooks/usePermissions';

interface Props {
  onAddSelf: () => void;
  onAddOther: () => void;
  registered: boolean;
  variant: 'waitingList' | 'travel';
  disabled?: boolean;
}

const ADD_TO_LOCALE = {
  waitingList: 'travel.passengers.add_to_waitingList',
  travel: 'travel.passengers.add_to_travel',
};

const AddPassengerButtons = ({
  onAddSelf,
  onAddOther,
  registered,
  variant,
  disabled,
}: Props) => {
  const {t} = useTranslation();
  const {
    userPermissions: {canJoinTravels, canAddToTravel},
  } = usePermissions();

  return (
    <Box textAlign="center">
      {canJoinTravels && (
        <Box p={1} pt={2}>
          <Button
            sx={buttonStyle}
            variant="contained"
            color="primary"
            fullWidth
            onClick={onAddSelf}
            disabled={disabled || registered}
          >
            {t(
              registered
                ? 'travel.passengers.registered'
                : 'travel.passengers.add_me'
            )}
          </Button>
        </Box>
      )}
      {canAddToTravel && (
        <Box p={1} pt={2}>
          <Button
            sx={buttonStyle}
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onAddOther}
            disabled={disabled}
          >
            {t(ADD_TO_LOCALE[variant])}
          </Button>
        </Box>
      )}
    </Box>
  );
};

const buttonStyle = {
  py: 1,
  px: 8,
  md: {
    px: 4,
  },
};

export default AddPassengerButtons;
