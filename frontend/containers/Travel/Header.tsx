import moment from 'moment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import getMapsLink from '../../lib/getMapsLink';
import useMapStore from '../../stores/useMapStore';
import {Travel} from '../../generated/graphql';

interface Props {
  travel: Travel & {id: string};
  toggleEditing: () => void;
}

const Header = (props: Props) => {
  const {travel, toggleEditing} = props;
  const theme = useTheme();
  const {t} = useTranslation();
  const {setFocusOnTravel} = useMapStore();

  return (
    <Box
      sx={{padding: 2}}
      onClick={() => {
        setFocusOnTravel(travel);
        const mapElement = document?.getElementById('map');
        mapElement.scrollIntoView({behavior: 'smooth'});
      }}
    >
      <IconButton
        size="small"
        color="primary"
        sx={{position: 'absolute', top: 0, right: 0, margin: theme.spacing(1)}}
        onClick={toggleEditing}
        id="EditTravelBtn"
      >
        <Icon>edit</Icon>
      </IconButton>
      {!!travel.departure && (
        <Typography variant="overline" id="TravelDeparture">
          {moment(travel.departure).format('LLLL')}
        </Typography>
      )}
      <Typography variant="h5">
        {travel.vehicleName}
      </Typography>
      {!!travel.phone_number && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="subtitle2">
            {t('travel.fields.phone')}
          </Typography>
          <Typography variant="body2" id="TravelPhone">
            {travel.phone_number}
          </Typography>
        </Box>
      )}
      {!!travel.meeting && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="subtitle2">
            {t('travel.fields.meeting_point')}
          </Typography>
          <Typography variant="body2">
            <Link
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={getMapsLink(travel.meeting)}
            >
              {travel.meeting}
            </Link>
          </Typography>
        </Box>
      )}
      {!!travel.details && (
        <Box sx={{marginTop: 2}}>
          <Typography variant="subtitle2">
            {t('travel.fields.details')}
          </Typography>
          <Typography variant="body2" id="TravelDetails">
            {travel.details}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Header;
