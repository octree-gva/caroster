import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import useProfile from '../../hooks/useProfile';
import DrawerMenuItem from './DrawerMenuItem';

interface Props {
  eventUuid: string;
}

const DrawerMenu = ({eventUuid}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const {connected} = useProfile();
  const appLink = connected ? '/dashboard' : `/e/${eventUuid}` || '';

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
        active={router.pathname == `/e/[uuid]`}
      />
      <DrawerMenuItem
        title={t('drawer.waitingList')}
        onClick={() => {
          router.push(`/e/${uuid}/waitingList`, null, {shallow: true});
        }}
        icon="group"
        active={router.pathname == `/e/[uuid]/waitingList`}
      />
      <DrawerMenuItem
        title={t('drawer.information')}
        onClick={() => {
          router.push(`/e/${uuid}/details`, null, {shallow: true});
        }}
        icon="info"
        active={router.pathname == `/e/[uuid]/details`}
      />
    </Drawer>
  );
};

export default DrawerMenu;
