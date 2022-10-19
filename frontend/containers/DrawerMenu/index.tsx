import Drawer from '@mui/material/Drawer';
import {useTheme} from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import DrawerMenuItem from './DrawerMenuItem';

const DrawerMenu = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  const router = useRouter();
  const {
    query: {uuid},
  } = router;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: '85px',

        [theme.breakpoints.down('md')]: {
          width: '100%',
          position: 'fixed',
          bottom: 0,
          zIndex: 1,
        },

        '& .MuiDrawer-paper': {
          zIndex: theme.zIndex.appBar - 1,
          width: '84px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          left: 0,
          top: 0,
          backgroundColor: '#242424',
          color: 'white',
          overflowX: 'hidden',
          position: 'static',

          [theme.breakpoints.down('md')]: {
            bottom: 0,
            top: 'auto',
            paddingTop: 0,
            height: '56px',
            width: '100%',
            flexDirection: 'row',
          },
        },
      }}
    >
      <DrawerMenuItem
        title={t('drawer.travels')}
        onClick={() => {
          router.push(`/e/${uuid}`, null, {shallow: true});
        }}
        Icon={<Icon>directions_car</Icon>}
        active={router.pathname == `/e/[uuid]`}
      />
      <DrawerMenuItem
        title={t('drawer.waitingList')}
        onClick={() => {
          router.push(`/e/${uuid}/waitingList`, null, {shallow: true});
        }}
        Icon={<Icon>group</Icon>}
        active={router.pathname == `/e/[uuid]/waitingList`}
      />
      <DrawerMenuItem
        title={t('drawer.information')}
        onClick={() => {
          router.push(`/e/${uuid}/details`, null, {shallow: true});
        }}
        Icon={<Icon>info</Icon>}
        active={router.pathname == `/e/[uuid]/details`}
      />
    </Drawer>
  );
};

export default DrawerMenu;
