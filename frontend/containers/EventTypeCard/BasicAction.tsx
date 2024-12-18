import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import useEventCreationStore from '../../stores/useEventCreationStore';
import {ProfileDocument, useCreateEventMutation} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import useAddToEvents from '../../hooks/useAddToEvents';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

type Props = {};

const BasicAction = (props: Props) => {
  const {t} = useTranslation();
  const router = useRouter();
  const {locale} = useLocale();
  const event = useEventCreationStore(s => s.event);
  const [createEvent] = useCreateEventMutation();
  const {addToEvent: addToUserEvents} = useAddToEvents();
  const session = useSession();
  const profile = session?.data?.profile;

  const onClick = async () => {
    try {
      const {data} = await createEvent({
        variables: {
          eventData: {
            ...event,
            lang: locale,
            email: event.email || profile?.email,
          },
        },
        refetchQueries: [ProfileDocument],
      });
      const createdEvent = data.createEvent.data;
      addToUserEvents(createdEvent.id);
      useEventCreationStore.persist.clearStorage();
      router.push(`/${locale}/e/${createdEvent.attributes.uuid}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={onClick}
    >{t`event.creation.basic.button`}</Button>
  );
};

export default BasicAction;
