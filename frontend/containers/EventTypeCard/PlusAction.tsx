import {Button} from '@mui/material';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
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
      addToUserEvents(createdEvent.id);
      useEventCreationStore.persist.clearStorage();
      setCookie('redirectPath', `/${locale}/e/${createdEvent.attributes.uuid}`);
      router.push(
        `/${locale}/new/prices?eventId=${createdEvent.attributes.uuid}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthenticated)
    return (
      <Button
        fullWidth
        variant="outlined"
        onClick={onClick}
      >{t`event.creation.plus.button`}</Button>
    );
  else
    return (
      <Link href={`/auth/login?redirectPath=/new/type/`} passHref>
        <Button variant="outlined" fullWidth>{t`signin.title`}</Button>
      </Link>
    );
};

export default PlusAction;
