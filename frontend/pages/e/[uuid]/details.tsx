import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EventIcon from '@mui/icons-material/Event';
import TuneIcon from '@mui/icons-material/Tune';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {PropsWithChildren, useState} from 'react';
import {useTranslation} from 'react-i18next';
import pageUtils from '../../../lib/pageUtils';
import ShareEvent from '../../../containers/ShareEvent';
import useEventStore from '../../../stores/useEventStore';
import useToastStore from '../../../stores/useToastStore';
import useMapStore from '../../../stores/useMapStore';
import Map from '../../../containers/Map';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {
  EventByUuidDocument,
  useUpdateEventMutation,
} from '../../../generated/graphql';
import EventPopup from '../../../containers/EventPopup';
import AddressAutofill from '../../../containers/AddressAutofill';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={DetailsTab} />;
};

const DetailsTab: TabComponent = ({}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {preventUpdateKey, setPreventUpdateKey, setCenter, setMarkers} =
    useMapStore();
  const [updateEvent] = useUpdateEventMutation();
  const addToast = useToastStore(s => s.addToast);
  const setEventUpdate = useEventStore(s => s.setEventUpdate);
  const event = useEventStore(s => s.event);
  const [isEditing, setIsEditing] = useState(false);

  const onSave = async e => {
    try {
      const {uuid, ...data} = event;
      const {id, travels, waitingPassengers, __typename, ...input} = data;
      await updateEvent({
        variables: {
          uuid,
          eventUpdate: {
            ...input,
          },
        },
        refetchQueries: ['eventByUUID'],
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      addToast(t('event.errors.cant_update'));
    }
  };

  const modifyButton = isEditing ? (
    <Tooltip
      title={t('event.details.save')}
      sx={{
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
      }}
    >
      <IconButton color="primary" onClick={onSave}>
        <CheckCircleOutlineIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip
      title={t('event.details.modify')}
      sx={{
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
      }}
    >
      <IconButton color="primary" onClick={() => setIsEditing(true)}>
        <TuneIcon />
      </IconButton>
    </Tooltip>
  );

  if (!event) return null;
  const {latitude, longitude} = event;

  const mapUpdateKey = `${event.uuid}.details`;
  if (preventUpdateKey !== mapUpdateKey) {
    setPreventUpdateKey(mapUpdateKey);
    setCenter([latitude, longitude]);
    setMarkers([
      {
        double: true,
        center: [latitude, longitude],
        popup: <EventPopup event={event} />,
      },
    ]);
  }

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {latitude && longitude ? <Map /> : <Box pt={6} />}
      <Container
        sx={{
          p: 4,
          mb: 11,
          mx: 0,
          [theme.breakpoints.down('md')]: {
            p: 2,
          },
        }}
      >
        <Card
          sx={{
            position: 'relative',
            maxWidth: '100%',
            width: '350px',
            p: 2,
          }}
        >
          <Typography variant="h4" pb={2}>
            {t('event.details')}
          </Typography>
          {modifyButton}
          <Box pt={2} pr={1.5}>
            <Typography variant="overline">{t('event.fields.name')}</Typography>
            <Typography variant="body1">
              {isEditing ? (
                <TextField
                  size="small"
                  fullWidth
                  value={event.name}
                  onChange={e => setEventUpdate({name: e.target.value})}
                  name="name"
                  id="EditEventName"
                />
              ) : (
                <Typography variant="body1" id="EventName">
                  {event.name ?? t('event.fields.empty')}
                </Typography>
              )}
            </Typography>
          </Box>
          <Box pt={2} pr={1.5}>
            <Typography variant="overline">{t('event.fields.date')}</Typography>
            {isEditing ? (
              <Typography variant="body1">
                <DatePicker
                  slotProps={{
                    textField: {
                      size: 'small',
                      id: `EditEventDate`,
                      fullWidth: true,
                      placeholder: t('event.fields.date_placeholder'),
                    },
                  }}
                  format="DD/MM/YYYY"
                  value={moment(event.date)}
                  onChange={date =>
                    setEventUpdate({
                      date: !date ? null : moment(date).format('YYYY-MM-DD'),
                    })
                  }
                />
              </Typography>
            ) : (
              <Box position="relative">
                <Typography variant="body1" id="EventDate">
                  {event.date
                    ? moment(event.date).format('DD/MM/YYYY')
                    : t('event.fields.empty')}
                </Typography>
                <EventIcon
                  color="action"
                  sx={{
                    position: 'absolute',
                    right: theme.spacing(-0.5),
                    top: 0,
                  }}
                />
              </Box>
            )}
          </Box>
          <Box pt={2} pr={1.5}>
            <Typography variant="overline">
              {t('event.fields.address')}
            </Typography>
            {isEditing ? (
              <AddressAutofill
                label={t('event.creation.address')}
                address={event.address}
                onSelect={({location, address}) => {
                  setEventUpdate({
                    address,
                    latitude: location[1],
                    longitude: location[0],
                  });
                }}
              />
            ) : (
              <Box position="relative">
                <Typography variant="body1" id="EventAddress" sx={{pr: 3}}>
                  {event.address ? (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        event.address
                      )}`}
                      onClick={e => e.preventDefault}
                    >
                      {event.address}
                    </Link>
                  ) : (
                    t('event.fields.empty')
                  )}
                </Typography>
                <PlaceOutlinedIcon
                  color="action"
                  sx={{
                    position: 'absolute',
                    right: theme.spacing(-0.5),
                    top: 0,
                  }}
                />
              </Box>
            )}
          </Box>
          <Box pt={2} pr={1.5}>
            <Typography variant="overline">
              {t('event.fields.description')}
            </Typography>
            {isEditing ? (
              <Typography variant="body1">
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  inputProps={{maxLength: 250}}
                  value={event.description || ''}
                  onChange={e => setEventUpdate({description: e.target.value})}
                  id={`EditEventDescription`}
                  name="description"
                />
              </Typography>
            ) : (
              <Typography variant="body1" id="EventDescription" sx={{pr: 3}}>
                {event.description ?? t('event.fields.empty')}
              </Typography>
            )}
          </Box>
          {!isEditing && (
            <ShareEvent
              title={`Caroster ${event.name}`}
              sx={{width: '100%', mt: 2}}
            />
          )}
        </Card>
      </Container>
    </Box>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient) => {
    const {uuid} = context.query;
    const {host = ''} = context.req.headers;
    let event = null;

    // Fetch event
    try {
      const {data} = await apolloClient.query({
        query: EventByUuidDocument,
        variables: {uuid},
      });
      event = data?.eventByUUID?.data;
    } catch (error) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        eventUUID: uuid,
        metas: {
          title: event?.attributes?.name || '',
          url: `https://${host}${context.resolvedUrl}`,
        },
      },
    };
  }
);
export default Page;
