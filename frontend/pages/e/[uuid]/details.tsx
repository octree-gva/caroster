import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
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
import useSettings from '../../../hooks/useSettings';
import useEventStore from '../../../stores/useEventStore';
import useToastStore from '../../../stores/useToastStore';
import Map from '../../../containers/Map';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {
  EventByUuidDocument,
  useUpdateEventMutation,
} from '../../../generated/graphql';

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
  const settings = useSettings();
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
        variables: {uuid, eventUpdate: input},
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

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Map />
      <Container sx={{pt: 4}}>
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
              <DatePicker
                renderInput={props => (
                  <Typography variant="body1">
                    <TextField
                      size="small"
                      {...props}
                      id={`EditEventDate`}
                      fullWidth
                      placeholder={t('event.fields.date_placeholder')}
                    />
                  </Typography>
                )}
                inputFormat="DD/MM/yyyy"
                value={event.date}
                onChange={date =>
                  setEventUpdate({
                    date: !date ? null : moment(date).format('YYYY-MM-DD'),
                  })
                }
              />
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
              <Typography variant="body1">
                <TextField
                  size="small"
                  fullWidth
                  inputProps={{
                    maxLength: 250,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{mr: -0.5}}>
                        <PlaceOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={event.address}
                  onChange={e => setEventUpdate({address: e.target.value})}
                  id={`EditEventAddress`}
                  name="address"
                />
              </Typography>
            ) : (
              <Box position="relative">
                <Typography variant="body1" id="EventAddress">
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
              <Typography variant="body1" id="EventDescription">
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
