import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import {Helmet} from 'react-helmet';
import useGTM from '../hooks/useGTM';
import GenericToolbar from '../containers/GenericToolbar';
import Banner from '../components/Banner';
import useMatomo from '../hooks/useMatomo';
import {ActionType} from '../containers/GenericMenu/Action';

interface Props {
  children: ReactNode;
  Topbar?: ReactNode;
  className?: string;
  menuTitle?: string;
  menuActions?: Array<ActionType>;
  pageTitle?: string;
  displayMenu?: boolean;
  goBack?: () => void;
  announcement?: string;
}

const DefaultLayout = (props: Props) => {
  useGTM();
  useMatomo();
  const {
    children,
    Topbar = null,
    className,
    pageTitle = undefined,
    displayMenu = true,
    menuTitle = 'Caroster',
    menuActions,
    goBack = null,
    announcement,
  } = props;

  return (
    <div className={className}>
      <Helmet>
        <title>{pageTitle || menuTitle}</title>
      </Helmet>
      <Box display="flex" flexDirection="column" height="100vh" width="100%">
        <Box position="sticky" top={0} zIndex={1100}>
          <Banner announcement={announcement} />
          {Topbar && <Topbar />}
        </Box>
        {displayMenu && (menuTitle || menuActions) && (
          <GenericToolbar
            title={menuTitle}
            actions={menuActions}
            goBack={goBack}
          />
        )}

        {children}
      </Box>
    </div>
  );
};

export default DefaultLayout;
