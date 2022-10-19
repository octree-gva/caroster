import moment from 'moment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {PropsWithChildren, useState} from 'react';
import {useTranslation} from 'react-i18next';
import pageUtils from '../../../lib/pageUtils';
import ShareEvent from '../../../containers/ShareEvent';
import useEventStore from '../../../stores/useEventStore';
import useToastStore from '../../../stores/useToastStore';
import useSettings from '../../../hooks/useSettings';
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
  const idPrefix = isEditing ? 'EditEvent' : 'Event';

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
  const sectionSx = {
    marginBottom: theme.spacing(2),
    width: '540px',
    maxWidth: '100%',
    paddingX: theme.spacing(2),
  };

  const modifyButton = isEditing ? (
    <Button
      variant="contained"
      color="primary"
      sx={{position: 'absolute', right: theme.spacing(2)}}
      onClick={onSave}
    >
      {t('event.details.save')}
    </Button>
  ) : (
    <Button
      variant="text"
      color="primary"
      sx={{position: 'absolute', right: theme.spacing(2)}}
      onClick={() => setIsEditing(true)}
    >
      {t('event.details.modify')}
    </Button>
  );

  if (!event) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        paddingLeft: '80px',

        [theme.breakpoints.down('md')]: {
          paddingLeft: 0,
          paddingBottom: '80px',
        },
      }}
    >
      <Container maxWidth="sm" sx={{marginTop: theme.spacing(6)}}>
        <Paper sx={{position: 'relative', padding: theme.spacing(2)}}>
          {modifyButton}
          <Box sx={sectionSx}>
            <Typography variant="h6">{t('event.fields.name')}</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                value={event.name}
                onChange={e => setEventUpdate({name: e.target.value})}
                name="name"
                id="EditEventName"
              />
            ) : (
              <Typography variant="body1" id={`${idPrefix}Name`}>
                {event.name ?? t('event.fields.empty')}
              </Typography>
            )}
          </Box>
          <Box sx={sectionSx}>
            <Typography variant="h6">{t('event.fields.date')}</Typography>
            {isEditing ? (
              <DatePicker
                renderInput={props => (
                  <TextField
                    {...props}
                    id={`${idPrefix}Date`}
                    fullWidth
                    placeholder={t('event.fields.date_placeholder')}
                  />
                )}
                value={event.date}
                onChange={date =>
                  setEventUpdate({
                    date: !date ? null : moment(date).format('YYYY-MM-DD'),
                  })
                }
              />
            ) : (
              <Typography variant="body1" id={`${idPrefix}Date`}>
                {event.date
                  ? moment(event.date).format('DD/MM/YYYY')
                  : t('event.fields.empty')}
              </Typography>
            )}
          </Box>
          <Box sx={sectionSx}>
            <Typography variant="h6">{t('event.fields.address')}</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                maxRows={4}
                inputProps={{maxLength: 250}}
                helperText={`${event.address?.length ?? 0}/250`}
                defaultValue={event.address}
                value={event.address}
                onChange={e => setEventUpdate({address: e.target.value})}
                id={`${idPrefix}Address`}
                name="address"
              />
            ) : (
              <Typography variant="body1" id={`${idPrefix}Address`}>
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
            )}
          </Box>
          <Box sx={sectionSx}>
            <Typography variant="h6">
              {t('event.fields.description')}
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                maxRows={4}
                inputProps={{maxLength: 250}}
                helperText={`${event.description?.length || 0}/250`}
                defaultValue={event.description}
                value={event.description || ''}
                onChange={e => setEventUpdate({description: e.target.value})}
                id={`${idPrefix}Description`}
                name="description"
              />
            ) : (
              <Typography variant="body1" id={`${idPrefix}Description`}>
                {event.description ?? t('event.fields.empty')}
              </Typography>
            )}
          </Box>
          <Typography variant="h6">{t('event.fields.link')}</Typography>
          <Typography>{t('event.fields.link_desc')}</Typography>
          <Box py={4} justifyContent="center" display="flex">
            <ShareEvent
              title={`Caroster ${event.name}`}
              url={`${window.location.href}`}
            />{' '}
          </Box>
          <Divider variant="middle" />
          <Box pt={2} justifyContent="center" display="flex">
            <Link href={settings?.about_link} target="_blank" rel="noopener">
              {t('event.details.aboutCaroster')}
            </Link>
          </Box>
        </Paper>
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
