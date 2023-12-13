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
import {Travel} from '../../generated/graphql';

type TravelObject = Travel & {id: string};

export type SelectTravel = (travel: TravelObject) => Promise<void>;

interface Props {
  travel: TravelObject;
  select: SelectTravel;
}

const AvailableTravel = ({travel, select}: Props) => {
  const {t} = useTranslation();
  const passengersCount = travel.passengers?.data.length || 0;
  const availableSeats = travel.seats - passengersCount || 0;

  return (
    <>
      <Divider />
      <ListItem sx={{flexDirection: 'column', p: 2}}>
        <Box display="flex" justifyContent="space-between" width={1}>
          <Box>
            {travel.departure && (
              <Typography variant="overline" color="GrayText">
                {t('passenger.assign.departure')}
                {moment(travel.departure).format('LLLL')}
              </Typography>
            )}
            <Typography variant="body1" sx={{pt: 1}}>
              {travel.vehicleName}
            </Typography>
          </Box>
          <Button
            color="primary"
            variant="contained"
            size="small"
            sx={{maxHeight: '24px'}}
            onClick={() => select(travel)}
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
          value={(passengersCount / travel.seats || 0) * 100}
          variant={travel.seats ? 'determinate' : 'indeterminate'}
        />
        <Box display="flex" justifyContent="space-between" width={1}>
          <Typography variant="body1">
            {t('passenger.assign.seats', {
              count: availableSeats || 0,
            })}
          </Typography>
          <Link
            variant="overline"
            target="_blank"
            rel="noreferrer"
            href={getMapsLink(travel.meeting)}
            onClick={e => e.preventDefault}
          >
            {travel.meeting}
          </Link>
        </Box>
      </ListItem>
    </>
  );
};

export default AvailableTravel;
