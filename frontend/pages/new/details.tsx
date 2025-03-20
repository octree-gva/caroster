import pageUtils from '../../lib/pageUtils';
import Layout from '../../layouts/EventCreation';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useTranslation} from 'next-i18next';
import useEventCreationStore from '../../stores/useEventCreationStore';
import {Button, Paper, Stack, TextField} from '@mui/material';
import PlaceInput from '../../containers/PlaceInput';
import NextLink from 'next/link';
import moment from 'moment';
import Logo from '../../components/Logo';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

const NewEventDetails = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const event = useEventCreationStore(s => s.event);
  const setField = useEventCreationStore(s => s.setField);

  useEffect(() => {
    if (!event.name) router.push('/new');
  }, [event.name, router]);

  return (
    <Layout>
      <Paper
        sx={{
          p: 2,
          width: '480px',
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto',
        }}
      >
        <Logo />
        <Stack spacing={2}>
          <DatePicker
            slotProps={{textField: {fullWidth: true, variant: 'standard'}}}
            format="DD/MM/YYYY"
            label={t('event.creation.date')}
            value={event.date ? moment(event.date, 'YYYY-MM-DD') : null}
            onChange={value => setField('date', value?.format('YYYY-MM-DD'))}
          />
          <PlaceInput
            label={t('event.fields.address')}
            place={event.address}
            latitude={event.latitude}
            longitude={event.longitude}
            onSelect={({place, latitude, longitude}) => {
              setField('address', place);
              setField('latitude', latitude);
              setField('longitude', longitude);
            }}
          />
          <TextField
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
            label={t('event.creation.description')}
            slotProps={{htmlInput: {maxLength: 250}}}
            helperText={
              event.description?.length > 0
                ? `${event.description.length}/250`
                : t('event.creation.description_helper')
            }
            value={event.description}
            onChange={e => setField('description', e.target.value)}
            name="address"
          />
          <NextLink href="/new/type" passHref>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              id="NewEventSubmit"
            >
              {t('event.creation.toEventType')}
            </Button>
          </NextLink>
        </Stack>
      </Paper>
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default NewEventDetails;
