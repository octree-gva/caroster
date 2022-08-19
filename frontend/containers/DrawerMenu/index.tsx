import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import DrawerMenuItem from './DrawerMenuItem';
import useStyles from './styles';

const DrawerMenu = () => {
  const {t} = useTranslation();
  const classes = useStyles();
  const router = useRouter();
  const {
    query: {uuid},
  } = router;

  return (
    <Drawer variant="permanent" className={classes.drawer}>
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
