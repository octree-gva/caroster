import {useMemo, useState} from 'react';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import moment from 'moment';
import {useTranslation} from 'next-i18next';
import {useTheme} from '@mui/material/styles';
import useEventStore from '../../stores/useEventStore';
import useToastStore from '../../stores/useToastStore';
import useProfile from '../../hooks/useProfile';
import useAddToEvents from '../../hooks/useAddToEvents';
import usePassengersActions from '../../hooks/usePassengersActions';
import Map from '../Map';
import Travel from '../Travel';
import NoCar from './NoCar';
import {TravelEntity} from '../../generated/graphql';
import {AddPassengerToTravel} from '../NewPassengerDialog';
import MasonryContainer from './MasonryContainer';
import LoginToAttend from '../LoginToAttend/LoginToAttend';
import usePermissions from '../../hooks/usePermissions';
import useDisplayTravels from './useDisplayTravels';
import useDisplayMarkers from './useDisplayMarkers';
import FilterByDate from './FilterByDate';
import {Button, Icon} from '@mui/material';
import useTravelsStore from '../../stores/travelsStore';

interface Props {
  showTravelModal: () => void;
}

const TravelColumns = (props: Props) => {
  const theme = useTheme();
  const event = useEventStore(s => s.event);
  const travels = event?.travels?.data || [];
  const {t} = useTranslation();
  const addToast = useToastStore(s => s.addToast);
  const {addToEvent} = useAddToEvents();
  const {profile, userId} = useProfile();
  const {
    userPermissions: {canAddTravel},
  } = usePermissions();

  const [selectedTravel, setSelectedTravel] = useState<TravelEntity>();
  const datesFilters = useTravelsStore(s => s.datesFilter);
  const {addPassenger} = usePassengersActions();
  const {displayedTravels} = useDisplayTravels();
  useDisplayMarkers({event});

  const buttonFilterContent = useMemo(() => {
    if (datesFilters.length > 1) return t('event.filter.dates');
    else if (datesFilters.length === 1)
      return datesFilters.map(date => date.format('dddd Do MMMM'));
    else return t('event.filter.allDates');
  }, [datesFilters, t]);

  const addSelfToTravel = async (travel: TravelEntity) => {
    const hasName = profile.firstName && profile.lastName;
    const userName = profile.firstName + ' ' + profile.lastName;
    try {
      await addPassenger({
        user: userId,
        email: profile.email,
        name: hasName ? userName : profile.username,
        travel: travel.id,
        event: event.id,
      });
      addToEvent(event.id);
      addToast(t('passenger.success.added_self_to_car'));
    } catch (error) {
      console.error(error);
    }
  };

  const isCarosterPlus = event?.enabled_modules?.includes('caroster-plus');

  const showMap =
    (!!event?.latitude && !!event?.longitude) ||
    travels?.some(
      ({attributes: {meeting_latitude, meeting_longitude}}) =>
        meeting_latitude && meeting_longitude
    );

  if (!event || travels?.length === 0)
    return (
      <NoCar
        showImage
        showTravelModal={props.showTravelModal}
        eventName={event?.name}
        title={t('event.no_travel.title')}
        isCarosterPlus={isCarosterPlus}
      />
    );

  const dates = Array.from(
    new Set(travels.map(travel => travel?.attributes?.departureDate))
  )
    .map(date => moment(date))
    .filter(date => date.isValid())
    .sort((a, b) => (a.isAfter(b) ? 1 : -1));

  return (
    <>
      {showMap && <Map />}
      <Box px={3} py={2} display="flex" gap={2} maxWidth="100%" flexWrap="wrap">
        <FilterByDate dates={dates} buttonFilterContent={buttonFilterContent} />
        {canAddTravel() && (
          <Button
            onClick={props.showTravelModal}
            aria-label="add-car"
            variant="contained"
            color="secondary"
            endIcon={<Icon>add</Icon>}
            sx={{width: {xs: 1, sm: 'auto'}}}
          >
            {t('travel.creation.title')}
          </Button>
        )}
      </Box>
      <Box
        p={0}
        pt={showMap ? 0 : 13}
        pb={11}
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: showMap ? '50vh' : '100vh',
          [theme.breakpoints.down('md')]: {
            maxHeight: showMap ? '50vh' : '100vh',
            px: 1,
          },
        }}
      >
        <Masonry columns={{xl: 4, lg: 3, md: 2, sm: 2, xs: 1}} spacing={0}>
          {!canAddTravel() && (
            <MasonryContainer key="no_other_travel">
              <LoginToAttend title={t('event.loginToAttend')} />
            </MasonryContainer>
          )}
          {displayedTravels?.map(travel => {
            return (
              <MasonryContainer key={travel.id}>
                <Travel
                  travel={travel}
                  onAddSelf={() => addSelfToTravel(travel)}
                  onAddOther={() => setSelectedTravel(travel)}
                  {...props}
                />
              </MasonryContainer>
            );
          })}
          <MasonryContainer key="no_other_travel">
            <NoCar
              eventName={event?.name}
              title={t('event.no_other_travel.title')}
              isCarosterPlus={isCarosterPlus}
            />
          </MasonryContainer>
        </Masonry>
      </Box>
      {!!selectedTravel && (
        <AddPassengerToTravel
          open={!!selectedTravel}
          toggle={() => setSelectedTravel(null)}
          travel={selectedTravel}
        />
      )}
    </>
  );
};

export default TravelColumns;
