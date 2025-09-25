import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import useProfile from '../../hooks/useProfile';
import DrawerMenuItem from './DrawerMenuItem';
import useEventStore from '../../stores/useEventStore';
import usePermissions from '../../hooks/usePermissions';
import theme from '../../theme';

interface Props {
  eventUuid: string;
}

const DrawerMenu = ({eventUuid}: Props) => {
  const {t} = useTranslation();

  const event = useEventStore(s => s.event);
  const {connected} = useProfile();
  const appLink = connected ? '/dashboard' : `/e/${eventUuid}` || '';
  const isCarosterPlusEvent = event?.enabled_modules?.includes('caroster-plus');

  const {
    userPermissions: {canSeeAdminWaitingList},
  } = usePermissions();

  const router = useRouter();
  const {
    query: {uuid},
  } = router;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: '240px',

        [theme.breakpoints.down('md')]: {
          width: '100%',
          position: 'fixed',
          bottom: 0,
          zIndex: 1,
        },

        '& .MuiDrawer-paper': {
          zIndex: theme.zIndex.appBar - 1,
          width: '239px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          left: 0,
          top: 0,
          color: 'white',
          overflowX: 'hidden',
          position: 'static',

          [theme.breakpoints.down('md')]: {
            bottom: 0,
            top: 'auto',
            paddingTop: 0,
            height: '80px',
            width: '100%',
            flexDirection: 'row',
            boxShadow: '0px -3px 8px 0px rgba(0, 0, 0, 0.08)',
          },
        },
      }}
    >
      <Link href={appLink}>
        <Box
          sx={{
            margin: 3,
            width: 64,
            height: 32,
            cursor: 'pointer',

            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          <img src="/assets/logo.svg" alt="Logo" />
        </Box>
      </Link>
      <DrawerMenuItem
        title={t('drawer.travels')}
        onClick={() => {
          router.push(`/e/${uuid}`, null, {shallow: true});
        }}
        icon="directions_car"
        active={router.pathname === `/e/[uuid]`}
      />
      {isCarosterPlusEvent && connected && (
        <DrawerMenuItem
          title={t('drawer.alerts')}
          onClick={() =>
            router.push(`/e/${uuid}/alerts`, null, {shallow: true})
          }
          icon="track_changes"
          active={router.pathname === `/e/[uuid]/alerts`}
        />
      )}

      {!isCarosterPlusEvent && (
        <DrawerMenuItem
          title={t('drawer.waitingList')}
          onClick={() =>
            router.push(`/e/${uuid}/waitingList`, null, {shallow: true})
          }
          icon="group"
          active={
            router.pathname === `/e/[uuid]/waitingList` ||
            router.pathname === `/e/[uuid]/assign/[passengerId]`
          }
        />
      )}

      {isCarosterPlusEvent && canSeeAdminWaitingList() && (
        <DrawerMenuItem
          title={t('drawer.waitingList')}
          onClick={() =>
            router.push(`/e/${uuid}/adminWaitingList`, null, {shallow: true})
          }
          icon="group"
          active={router.pathname === `/e/[uuid]/adminWaitingList`}
        />
      )}

      <DrawerMenuItem
        title={t('drawer.information')}
        onClick={() => {
          router.push(`/e/${uuid}/details`, null, {shallow: true});
        }}
        icon="info"
        active={router.pathname === `/e/[uuid]/details`}
      />
      <DrawerMenuItem
        title={t('drawer.options')}
        onClick={() => {
          router.push(`/e/${uuid}/options`, null, {shallow: true});
        }}
        icon="settings"
        active={router.pathname === `/e/[uuid]/options`}
      />
    </Drawer>
  );
};

export default DrawerMenu;
