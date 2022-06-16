import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import router, {useRouter} from 'next/router';
import DrawerMenuItem from './DrawerMenuItem';
import useStyles from './styles';
import useBannerStore from '../../stores/useBannerStore';
import useEventStore from '../../stores/useEventStore';
import Box from '@material-ui/core/Box';

const DrawerMenu = () => {
  const {t} = useTranslation();
  const bannerOffset = useBannerStore(s => s.offset);
  const areDetailsOpened = useEventStore(s => s.areDetailsOpened);
  const setAreDetailsOpened = useEventStore(s => s.setAreDetailsOpened);
  const classes = useStyles({bannerOffset});
  const {
    query: {uuid},
  } = useRouter();

  return (
    <Drawer variant="permanent" className={classes.drawer}>
      <DrawerMenuItem
        title={t('drawer.travels')}
        onClick={() => {
          router.push(`/e/${uuid}`, null, {shallow: true});
          setAreDetailsOpened(false);
        }}
        Icon={<Icon>directions_car</Icon>}
        active={router.pathname == `/e/[uuid]`}
      />
      <Box mb={1.5}>
        <DrawerMenuItem
          title={t('drawer.waitingList')}
          onClick={() => {
            router.push(`/e/${uuid}/waitingList`, null, {shallow: true});
            setAreDetailsOpened(false);
          }}
          Icon={<Icon>group</Icon>}
          active={router.pathname == `/e/[uuid]/waitingList`}
        />
      </Box>

      <DrawerMenuItem
        title={t('drawer.information')}
        onClick={() => setAreDetailsOpened(true)}
        Icon={<Icon>info</Icon>}
        active={areDetailsOpened}
      />
    </Drawer>
  );
};

export default DrawerMenu;
