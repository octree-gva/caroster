import {ReactNode} from 'react';
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
import {useTranslation} from 'next-i18next';
import useProfile from '../../hooks/useProfile';
import {PassengerEntity} from '../../generated/graphql';
import usePermissions from '../../hooks/usePermissions';

interface Props {
  passenger?: PassengerEntity;
  isTravel?: boolean;
  Actions?: (props: {passenger: PassengerEntity}) => ReactNode;
}

const Passenger = (props: Props) => {
  const {passenger, isTravel, Actions} = props;
  const theme = useTheme();
  const {t} = useTranslation();
  const {
    userPermissions: {canSeeFullName},
  } = usePermissions();

  const {userId} = useProfile();
  const isUser = `${userId}` === passenger?.attributes.user?.data?.id;

  if (passenger) {
    return (
      <Box
        aria-label="user informations"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: 0,
        }}
      >
        <ListItemText
          primary={
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
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
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {getPassengerName(passenger, canSeeFullName())}
              </Typography>
              {isUser && (
                <Chip
                  sx={{ml: 1}}
                  label={t('generic.me')}
                  variant="outlined"
                  size="small"
                />
              )}
              {!isTravel && (
                <Typography
                  sx={{pl: 1, color: 'GrayText'}}
                  component="span"
                  variant="caption"
                >
                  {passenger.attributes.location}
                </Typography>
              )}
            </Box>
          }
        />
        <Actions passenger={passenger} />
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

const getPassengerName = (
  passenger: PassengerEntity,
  canSeeFullName: boolean
) => {
  const hideName = (name: string) => (canSeeFullName ? name : `${name[0]}.`);

  if (passenger.attributes.name && passenger.attributes.lastname)
    return `${passenger.attributes.name} ${hideName(
      passenger.attributes.lastname
    )}`;

  const linkedUser = passenger.attributes?.user?.data?.attributes;
  if (linkedUser?.firstName && linkedUser?.lastName)
    return `${linkedUser.firstName} ${hideName(linkedUser.lastName)}`;

  return passenger.attributes.name;
};

export default Passenger;
