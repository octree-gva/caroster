import moment from 'moment';
import Linkify from 'linkify-react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {PropsWithChildren, useState} from 'react';
import {useTranslation} from 'next-i18next';
import pageUtils from '../../../lib/pageUtils';
import DetailsLink from '../../../containers/DetailsLink';
import ShareEvent from '../../../containers/ShareEvent';
import PlaceInput from '../../../containers/PlaceInput';
import LangSelector from '../../../components/LangSelector';
import usePermissions from '../../../hooks/usePermissions';
import useEventStore from '../../../stores/useEventStore';
import useToastStore from '../../../stores/useToastStore';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {
  EventByUuidDocument,
  useUpdateEventMutation,
} from '../../../generated/graphql';
import {langLocales} from '../../../locales/constants';
import {getLocaleForLang} from '../../../lib/getLocale';

interface Props {
  eventUUID: string;
  announcement?: string;
}

const Page = (props: PropsWithChildren<Props>) => {
  return <EventLayout {...props} Tab={DetailsTab} />;
};

const DetailsTab: TabComponent<Props> = ({}) => {
  const {t} = useTranslation();
  const {
    userPermissions: {canEditEventDetails},
  } = usePermissions();
  const theme = useTheme();
  const [updateEvent] = useUpdateEventMutation();
  const addToast = useToastStore(s => s.addToast);
  const setEventUpdate = useEventStore(s => s.setEventUpdate);
  const event = useEventStore(s => s.event);
  const [isEditing, setIsEditing] = useState(false);

  if (!event) return null;

  const hasGeoloc = event.latitude && event.longitude;

  const onSave = async e => {
    try {
      const {uuid, ...data} = event;
      delete data.linkedEvent;
      delete data.isReturnEvent;
      const {
        id,
        travels,
        waitingPassengers,
        __typename,
        administrators,
        passengers,
        ...input
      } = data;
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

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Container
        sx={{
          p: 4,
          mt: 6,
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
            width: '480px',
            p: 2,
          }}
        >
          <Typography variant="h4" pb={2}>
            {t('event.details')}
          </Typography>
          {canEditEventDetails() && modifyButton}
          {(isEditing || event.name) && (
            <Box pt={2} pr={1.5}>
              <Typography variant="overline">
                {t('event.fields.name')}
              </Typography>
              <Typography>
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
                  <Typography id="EventName">{event.name}</Typography>
                )}
              </Typography>
            </Box>
          )}
          {(isEditing || event.date) && (
            <Box pt={2} pr={1.5}>
              <Typography variant="overline">
                {t('event.fields.date')}
              </Typography>
              {isEditing ? (
                <Typography>
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
                  <Typography id="EventDate">
                    {moment(event.date).format('DD/MM/YYYY')}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
          {(isEditing || event.address) && (
            <Box pt={2} pr={1.5}>
              <Typography variant="overline">
                {t('event.fields.address')}
              </Typography>
              {isEditing ? (
                <PlaceInput
                  place={event.address}
                  latitude={event.latitude}
                  longitude={event.longitude}
                  onSelect={({place, latitude, longitude}) =>
                    setEventUpdate({
                      address: place,
                      latitude,
                      longitude,
                    })
                  }
                />
              ) : (
                <Box position="relative">
                  <Typography
                    id="EventAddress"
                    title={t`placeInput.noCoordinates`}
                    sx={{
                      pr: 3,
                      display: 'inline-flex',
                      alignItems: 'center',
                      columnGap: 1,
                    }}
                  >
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
                    {!hasGeoloc && (
                      <InfoOutlinedIcon fontSize="small" color="warning" />
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
          {(isEditing || event.description) && (
            <Box pt={2} pr={1.5}>
              <Typography variant="overline">
                {t('event.fields.description')}
              </Typography>
              {isEditing ? (
                <Typography>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    inputProps={{maxLength: 250}}
                    value={event.description || ''}
                    onChange={e =>
                      setEventUpdate({description: e.target.value})
                    }
                    id={`EditEventDescription`}
                    name="description"
                  />
                </Typography>
              ) : (
                <Typography
                  id="EventDescription"
                  sx={{pr: 3, whiteSpace: 'pre-line'}}
                >
                  <Linkify options={{render: DetailsLink}}>
                    {event.description}
                  </Linkify>
                </Typography>
              )}
            </Box>
          )}
          {(isEditing || event.lang) && (
            <Box pt={2} pr={1.5}>
              <Typography variant="overline">
                {t('event.fields.lang')}
              </Typography>
              {isEditing ? (
                <LangSelector
                  value={event.lang}
                  onChange={lang => setEventUpdate({lang})}
                />
              ) : (
                <Typography id="EventLang" sx={{pr: 3}}>
                  {langLocales[event.lang]}
                </Typography>
              )}
            </Box>
          )}
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

    const description = await getLocaleForLang(
      event?.attributes?.lang,
      'meta.description'
    );

    return {
      props: {
        eventUUID: uuid,
        metas: {
          title: event?.attributes?.name || '',
          description,
          url: `https://${host}${context.resolvedUrl}`,
        },
      },
    };
  }
);
export default Page;
