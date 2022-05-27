import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import { useRouter } from 'next/router';
import DrawerMenuItem from './DrawerMenuItem';
import useStyles from './styles';
import useBannerStore from '../../stores/useBannerStore';

const DrawerMenu = () => {
  const {t} = useTranslation();
  const bannerOffset = useBannerStore(s => s.offset)
  const classes = useStyles({bannerOffset});
  const {query: {uuid}} = useRouter();

  return (
    <Drawer variant="permanent" className={classes.drawer}>
      <DrawerMenuItem
        title={t('drawer.travels')}
        href={`/e/${uuid}`}
        Icon={
          <Icon>directions_car</Icon>
        }
      />
      <DrawerMenuItem
        title={t('drawer.waitingList')}
        href={`/e/${uuid}`}
        Icon={
          <Icon>group</Icon>
        }
      />
      <DrawerMenuItem
        title={t('drawer.information')}
        href={`/e/${uuid}`}
        Icon={
          <Icon>info</Icon>
        }
      />
    </Drawer>
  );
};

export default DrawerMenu;
