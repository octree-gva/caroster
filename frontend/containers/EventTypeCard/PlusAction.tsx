import {Button} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useTranslation} from 'next-i18next';
import useLocale from '../../hooks/useLocale';
import useEventCreationStore from '../../stores/useEventCreationStore';
import {ProfileDocument, useCreateEventMutation} from '../../generated/graphql';
import useAddToEvents from '../../hooks/useAddToEvents';
import {setCookie} from '../../lib/cookies';
import {useRouter} from 'next/router';

type Props = {};

const PlusAction = (props: Props) => {
  const {t} = useTranslation();
  const session = useSession();
  const router = useRouter();
  const isAuthenticated = session.status === 'authenticated';
  const {locale} = useLocale();
  const event = useEventCreationStore(s => s.event);
  const [createEvent] = useCreateEventMutation();
  const {addToEvent: addToUserEvents} = useAddToEvents();
  const profile = session?.data?.profile;

  const onClick = async () => {
    try {
      const {data} = await createEvent({
        variables: {
          eventData: {
            ...event,
            lang: locale,
            email: event.email || profile?.email,
            unpaid: true,
          },
        },
        refetchQueries: [ProfileDocument],
      });
      const createdEvent = data.createEvent.data;
      useEventCreationStore.persist.clearStorage();

      if (isAuthenticated) {
        addToUserEvents(createdEvent.id);
        setCookie(
          'redirectPath',
          `/${locale}/e/${createdEvent.attributes.uuid}`
        );
        router.push(
          `/${locale}/new/prices?eventId=${createdEvent.attributes.uuid}`
        );
      } else {
        setCookie(
          'redirectPath',
          `/${locale}/new/prices?eventId=${createdEvent.attributes.uuid}`
        );
        router.push('/auth/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button fullWidth variant="outlined" onClick={onClick}>
      {t`event.creation.plus.button`}
    </Button>
  );
};

export default PlusAction;
