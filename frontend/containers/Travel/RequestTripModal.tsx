import {useTranslation} from 'react-i18next';
import {TextField, Typography, Box} from '@mui/material';
import {useEffect, useState} from 'react';
import FormDialog from '../FormDialog';
import PhoneInput from '../../components/PhoneInput';
import useProfile from '../../hooks/useProfile';
import useAddToEvents from '../../hooks/useAddToEvents';
import useToastStore from '../../stores/useToastStore';
import useEventStore from '../../stores/useEventStore';
import {validateEmail} from '../../lib/validation';
import {
  TravelEntity,
  useCreatePassengerMutation,
} from '../../generated/graphql';

interface Props {
  open: boolean;
  toggle: () => void;
  travel: TravelEntity;
}

const RequestTripModal = ({open, toggle, travel}: Props) => {
  const {t} = useTranslation();
  const {profile, userId} = useProfile();
  const [createPassenger] = useCreatePassengerMutation();
  const [email, setEmail] = useState('');
  useEffect(
    () => {
      setEmail(profile?.email);
    },
    [profile?.email]
  );
  const [phone, setPhone] = useState('');
  const {event} = useEventStore();
  const {addToEvent} = useAddToEvents();
  const addToast = useToastStore(s => s.addToast);
  const isEmailValid = validateEmail(email);
  const emailError = email !== '' && !isEmailValid;

  const onSubmit = async () => {
    const hasName = profile.firstName && profile.lastName;
    const userName = profile.firstName + ' ' + profile.lastName;
    try {
      createPassenger({
        variables: {
          passenger: {
            user: userId,
            email,
            phone,
            name: hasName ? userName : profile.username,
            travel: travel.id,
            event: event.id,
          },
        },
        refetchQueries: ['eventByUUID'],
      });
      addToEvent(event.id);
      addToast(t('passenger.success.added_self_to_car'));
      toggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormDialog
      open={open}
      cancel={toggle}
      onSubmit={onSubmit}
      title={t('travel.requestTrip.title')}
      action={t('travel.requestTrip.send')}
    >
      <Typography>{t('travel.requestTrip.description')}</Typography>
      <Box py={2}>
        <PhoneInput
          value={phone}
          onChange={v => setPhone(v)}
          label={t('travel.requestTrip.phone')}
        />
      </Box>
      <TextField
        fullWidth
        error={emailError}
        label={t('travel.requestTrip.email')}
        value={email}
        onChange={e => setEmail(e.target.value)}
        helperText={emailError && t('travel.requestTrip.emailHelper')}
        variant="standard"
      />
    </FormDialog>
  );
};

export default RequestTripModal;
