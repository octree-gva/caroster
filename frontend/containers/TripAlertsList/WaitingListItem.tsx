import {
  Box,
  Chip,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import {TripAlertEntity} from '../../generated/graphql';
import {useTranslation} from 'next-i18next';
import RadarIcon from '@mui/icons-material/Radar';
import useProfile from '../../hooks/useProfile';

type Props = {
  tripAlert: TripAlertEntity;
  onClick: () => void;
  isLast?: boolean;
};

const WaitingListItem = ({tripAlert, onClick, isLast}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {userId} = useProfile();

  const user = tripAlert.attributes.user?.data.attributes;
  const userName = `${user.firstName} ${user.lastName}`;
  const isLoggedUser = `${userId}` === tripAlert.attributes.user?.data.id;

  return (
    <ListItem divider={!isLast}>
      <ListItemText
        primary={
          <>
            {userName}
            {isLoggedUser && (
              <Chip
                sx={{marginLeft: 1}}
                label={t('generic.me')}
                variant="outlined"
                size="small"
              />
            )}
          </>
        }
        secondary={
          <>
            {tripAlert.attributes.address}
            <Box display="flex" alignItems="center" gap={0.5}>
              <RadarIcon fontSize="small" />
              {tripAlert.attributes.radius} km
            </Box>
          </>
        }
      />
      <IconButton
        onClick={onClick}
        color="primary"
        sx={{
          borderRadius: 1,
          padding: 0,
          fontSize: theme.typography.button,
        }}
      >
        {t('passenger.actions.place')}
        <Icon>chevron_right</Icon>
      </IconButton>
    </ListItem>
  );
};

export default WaitingListItem;
