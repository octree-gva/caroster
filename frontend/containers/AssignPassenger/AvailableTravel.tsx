import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import {useTranslation} from 'react-i18next';
import getMapsLink from '../../lib/getMapsLink';
import {Travel, TravelEntity} from '../../generated/graphql';

interface Props {
  travel: TravelEntity;
  assign: (travel: TravelEntity) => void;
}

const AvailableTravel = ({travel, assign}: Props) => {
  const {t} = useTranslation();
  const passengersCount = travel.attributes.passengers?.data.length || 0;
  const availableSeats = travel.attributes.seats - passengersCount;

  return (
    <>
      <Divider />
      <ListItem sx={{flexDirection: 'column', p: 2}}>
        <Box display="flex" justifyContent="space-between" width={1}>
          <Box>
            {travel.attributes.departure && (
              <Typography variant="overline" color="GrayText">
                {t('passenger.assign.departure')}
                {moment(travel.attributes.departure).format('LLLL')}
              </Typography>
            )}
            <Typography variant="body1" sx={{pt: 1}}>
              {travel.attributes.vehicleName}
            </Typography>
          </Box>
          <Button
            color="primary"
            variant="contained"
            size="small"
            sx={{maxHeight: '24px'}}
            onClick={() => assign(travel)}
          >
            {t('passenger.assign.assign')}
          </Button>
        </Box>
        <LinearProgress
          sx={{
            width: 1,
            mt: 2,
            mb: 1,
            backgroundColor: 'LightGray',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'Gray',
            },
          }}
          value={(passengersCount / travel.attributes.seats || 0) * 100}
          variant={travel.attributes.seats ? 'determinate' : 'indeterminate'}
        />
        <Box display="flex" justifyContent="space-between" width={1}>
          <Typography variant="body1" color="GrayText" minWidth="150px">
            {t('passenger.assign.seats', {
              count: availableSeats || 0,
            })}
          </Typography>
          <Link
            sx={{
              maxWidth: 'calc(100% - 150px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              paddingLeft: 2,
            }}
            variant="overline"
            target="_blank"
            rel="noreferrer"
            href={getMapsLink(travel.attributes.meeting)}
            onClick={e => e.preventDefault}
          >
            {travel.attributes.meeting}
          </Link>
        </Box>
      </ListItem>
    </>
  );
};

export default AvailableTravel;
