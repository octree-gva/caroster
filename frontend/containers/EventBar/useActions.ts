import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import useProfile from '../../hooks/useProfile';
import useRedirectUrlStore from '../../stores/useRedirectUrl';
import useShare from '../../hooks/useShare';
import useEventStore from '../../stores/useEventStore';

interface Props {
  onAdd: (isAddToMyEvent: boolean) => void;
  eventId?: string;
}

const useActions = (props: Props) => {
  const {onAdd, eventId} = props;
  const {t} = useTranslation();
  const router = useRouter();
  const {connected} = useProfile();
  const setRedirectUrl = useRedirectUrlStore(s => s.setRedirectUrl);
  const {share} = useShare();
  const {event} = useEventStore();

  const noUserMenuActions = [
    {
      label: t('event.actions.add_to_my_events'),
      onClick: () => {
        onAdd(true);
      },
      id: 'AddToMyEventsTab',
    },
    {divider: true},
    {
      label: t('event.actions.share'),
      onClick: () =>
        share({
          title: `Caroster ${event.name}`,
        }),
      id: 'ShareEvent',
    },
    {divider: true},
    {
      label: t('menu.login'),
      onClick: () => {
        setRedirectUrl(window.location.href);
        router.push('/auth/login');
      },
      id: 'SignInTab',
    },
    {
      label: t('menu.register'),
      onClick: () => {
        setRedirectUrl(window.location.href);
        router.push({
          pathname: '/auth/register',
          state: {event: eventId},
        });
      },
      id: 'SignUpTab',
    },
    {divider: true},
  ];

  const loggedMenuActions = [
    {
      label: t('menu.profile'),
      onClick: () => router.push('/profile'),
      id: 'ProfileTab',
    },
    {
      label: t('menu.dashboard'),
      onClick: () => (window.location.href = '/dashboard'),
      id: 'GoToDashboardTab',
    },
    {
      label: t('event.actions.share'),
      onClick: () =>
        share({
          title: `Caroster ${event.name}`,
        }),
      id: 'ShareEvent',
    },
    {divider: true},
  ];

  return connected ? loggedMenuActions : noUserMenuActions;
};

export default useActions;
