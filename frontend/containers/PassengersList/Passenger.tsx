import {ReactNode} from 'react';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import useProfile from '../../hooks/useProfile';
import {PassengerEntity} from '../../generated/graphql';

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
      <Box sx={{width: 1}}>
        <ListItemText
          primary={
            <Box
              sx={{
                width: 1,
                maxWidth: 1,
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
