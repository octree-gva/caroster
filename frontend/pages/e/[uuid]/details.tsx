import moment from 'moment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {PropsWithChildren, useState} from 'react';
import {useTranslation} from 'react-i18next';
import pageUtils from '../../../lib/pageUtils';
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
  const [updateEvent] = useUpdateEventMutation();
  const addToast = useToastStore(s => s.addToast);
  const setEventUpdate = useEventStore(s => s.setEventUpdate);
  const event = useEventStore(s => s.event);

  const onSave = async e => {
    try {
      const {uuid, ...data} = event;
      const {id, travels, waitingPassengers, __typename, ...input} = data;
      await updateEvent({
        variables: {uuid, eventUpdate: input},
        refetchQueries: ['eventByUUID'],
      });
    } catch (error) {
      console.error(error);
      addToast(t('event.errors.cant_update'));
    }
  };

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
          sx={{position: 'relative', maxWidth: '100%', width: '480px', p: 2}}
        >
          <Typography variant="h4" pb={2}>
            {t('event.details')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              position: 'absolute',
              right: theme.spacing(2),
              top: theme.spacing(2),
            }}
            onClick={onSave}
          >
            {t('event.details.save')}
          </Button>
          <Box>
            <Typography variant="overline">{t('event.fields.name')}</Typography>
            <Typography variant="body1">
              <TextField
                fullWidth
                value={event.name}
                onChange={e => setEventUpdate({name: e.target.value})}
                name="name"
                id="EditEventName"
              />
            </Typography>
          </Box>
          <Box>
            <Typography variant="overline">{t('event.fields.date')}</Typography>

            <DatePicker
              renderInput={props => (
                <Typography variant="body1">
                  <TextField
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
          </Box>
          <Box>
            <Typography variant="overline">
              {t('event.fields.address')}
            </Typography>
            <Typography variant="body1">
              <TextField
                fullWidth
                multiline
                maxRows={4}
                inputProps={{maxLength: 250}}
                value={event.address}
                onChange={e => setEventUpdate({address: e.target.value})}
                id={`EditEventAddress`}
                name="address"
              />
            </Typography>
          </Box>
          <Box>
            <Typography variant="overline">
              {t('event.fields.description')}
            </Typography>
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
          </Box>
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
