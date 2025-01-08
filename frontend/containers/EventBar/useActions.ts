import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import useProfile from '../../hooks/useProfile';
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
  const {share} = useShare();
  const event = useEventStore(s => s.event);

  const noUserMenuActions = [
    {
      label: t('event.actions.add_to_my_events'),
      onClick: () => {
        onAdd(true);
      },
      id: 'AddToMyEventsTab',
      icon: 'library_add',
    },
    {
      label: t('event.actions.share'),
      onClick: () =>
        share({
          title: `Caroster ${event.name}`,
        }),
      id: 'ShareEvent',
      icon: 'share',
    },
    {
      label: t('menu.login'),
      onClick: () => {
        router.push(`/auth/login?redirectPath=${router.asPath}`);
      },
      id: 'SignInTab',
      icon: 'login',
    },
  ];

  const loggedMenuActions = [
    {
      label: t('menu.profile'),
      onClick: () => router.push('/profile'),
      id: 'ProfileTab',
      icon: 'account_circle',
    },
    {
      label: t('menu.dashboard'),
      onClick: () => (window.location.href = '/dashboard'),
      id: 'GoToDashboardTab',
      icon: 'space_dashboard',
    },
    {
      label: t('event.actions.share'),
      onClick: () =>
        share({
          title: `Caroster ${event.name}`,
        }),
      id: 'ShareEvent',
      icon: 'share',
    },
  ];

  return connected ? loggedMenuActions : noUserMenuActions;
};

export default useActions;
