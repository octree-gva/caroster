import {ReactNode, useReducer} from 'react';
import {
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
  Typography,
  Icon,
  useTheme,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import useProfile from '../../hooks/useProfile';
import {PassengerEntity} from '../../generated/graphql';
import DrawerPassenger from '../DrawerPassenger';
import usePermissions from '../../hooks/usePermissions';

interface Props {
  passenger?: PassengerEntity;
  button?: ReactNode;
  isTravel?: boolean;
}

const Passenger = (props: Props) => {
  const {passenger, button, isTravel} = props;
  const theme = useTheme();
  const {t} = useTranslation();

  const [openDrawerPassenger, toggleDrawerPassenger] = useReducer(
    i => !i,
    false
  );

  const {
    userPermissions: {canSeePassengerDetails},
  } = usePermissions();

  const {userId} = useProfile();
  const isUser = `${userId}` === passenger?.attributes.user?.data?.id;
  const showLocation = isTravel ? null : (
    <Typography
      sx={{pl: 1, color: 'GrayText'}}
      component="span"
      variant="caption"
    >
      {passenger.attributes.location}
    </Typography>
  );

  if (passenger) {
    return (
      <Box sx={{width: 1}} aria-label="user informations">
        <ListItemText
          primary={
            <Box
              onClick={toggleDrawerPassenger}
              sx={{
                width: 1,
                maxWidth: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: canSeePassengerDetails(passenger)
                  ? 'pointer'
                  : 'inherit',
              }}
            >
              <Icon fontSize="inherit" sx={{verticalAlign: 'middle', mr: 0.5}}>
                person_outlined
              </Icon>
              <Typography
                component="span"
                variant="body1"
                sx={{
                  overflow: 'hidden',
                  maxWidth: 'calc(100% - 88px)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {passenger.attributes.name}
              </Typography>
              {isUser && (
                <Chip
                  sx={{marginLeft: 1}}
                  label={t('generic.me')}
                  variant="outlined"
                />
              )}
              {showLocation}
            </Box>
          }
        />
        {button}
        {canSeePassengerDetails(passenger) && (
          <DrawerPassenger
            isOpen={openDrawerPassenger}
            onClose={() => toggleDrawerPassenger()}
            firstName={passenger?.attributes.user?.data?.attributes.firstName}
            lastName={passenger?.attributes.user?.data?.attributes.lastName}
            email={passenger?.attributes.email}
          />
        )}
      </Box>
    );
  } else {
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
  }
};

export default Passenger;
