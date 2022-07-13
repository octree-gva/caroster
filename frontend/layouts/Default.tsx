import {ReactNode, useState} from 'react';
import {Helmet} from 'react-helmet';
import useGTM from '../hooks/useGTM';
import GenericToolbar from '../containers/GenericToolbar';
import {ActionType} from '../containers/GenericMenu/Action';
import Box from '@material-ui/core/Box';
import Banner from '../components/Banner';
import Headroom from 'react-headroom';
import useSettings from '../hooks/useSettings';

const ANNOUNCEMENT_STORAGE_KEY = 'lastAnnouncementSeen';

interface Props {
  children: ReactNode;
  Topbar?: ReactNode;
  className?: string;
  menuTitle?: string;
  menuActions?: Array<ActionType>;
  pageTitle?: string;
  displayMenu?: boolean;
  goBack?: () => void;
}

const DefaultLayout = (props: Props) => {
  useGTM();
  const {
    children,
    Topbar = null,
    className,
    pageTitle = undefined,
    displayMenu = true,
    menuTitle = 'Caroster',
    menuActions,
    goBack = null,
  } = props;
  const {announcement = ''} = useSettings() || {};
  const [lastAnnouncementSeen, setLastAnnouncementSeen] = useState(
    getStoredValue(ANNOUNCEMENT_STORAGE_KEY)
  );
  const showBanner = !!announcement && announcement !== lastAnnouncementSeen;

  const onBannerClear = () => {
    setStoredValue(ANNOUNCEMENT_STORAGE_KEY, `${announcement}`);
    setLastAnnouncementSeen(announcement);
  };

  return (
    <div className={className}>
      <Helmet>
        <title>{pageTitle || menuTitle}</title>
      </Helmet>
      <Box display="flex" flexDirection="column" height="100vh" width="100%">
        <Headroom>
          <Banner
            message={announcement}
            open={showBanner}
            onClear={onBannerClear}
          />
          {displayMenu && (menuTitle || menuActions) && (
            <GenericToolbar
              title={menuTitle}
              actions={menuActions}
              goBack={goBack}
            />
          )}
          {Topbar && <Topbar />}
        </Headroom>
        {children}
      </Box>
    </div>
  );
};

const getStoredValue = (storageKey: string) =>
  typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : '';

const setStoredValue = (storageKey: string, value: string) =>
  typeof localStorage !== 'undefined' &&
  localStorage.setItem(storageKey, value);

export default DefaultLayout;
