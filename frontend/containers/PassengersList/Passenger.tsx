import {ReactNode} from 'react';
import {useTheme} from '@mui/material/styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import {useTranslation} from 'react-i18next';
import {PassengerEntity} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

interface Props {
  passenger?: PassengerEntity;
  button?: ReactNode;
  isTravel?: boolean;
}

const Passenger = (props: Props) => {
  const {passenger, button, isTravel} = props;
  const theme = useTheme();
  const {t} = useTranslation();

  const {userId} = useProfile();

  const isUser = `${userId}` === passenger?.attributes.user?.data?.id;
  const showLocation = isTravel ? false : passenger.attributes.location;

  if (passenger) {
    return (
      <Box>
        <ListItemText
          primary={
            <>
              {passenger.attributes.name}
              {isUser && (
                <Chip
                  sx={{marginLeft: theme.spacing(2)}}
                  label={t('generic.me')}
                  variant="outlined"
                />
              )}
            </>
          }
          secondary={showLocation}
        />
        {button}
      </Box>
    );
  } else
    return (
      <>
        <ListItemAvatar>
          <ListItemIcon color="disabled">
            <Icon>person</Icon>
          </ListItemIcon>
        </ListItemAvatar>
        <ListItemText
          primary={t('travel.passengers.empty')}
          sx={{color: theme.palette.text.secondary}}
        />
      </>
    );
};

export default Passenger;
