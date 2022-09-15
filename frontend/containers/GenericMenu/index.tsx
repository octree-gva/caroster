import Menu from '@material-ui/core/Menu';
import {useTranslation} from 'react-i18next';
import useSettings from '../../hooks/useSettings';
import Languages from '../Languages/MenuItem';
import Action, {ActionType} from './Action';
import {signOut, useSession} from 'next-auth/react';

interface Props {
  anchorEl: Element;
  setAnchorEl: (el: Element) => void;
  actions: ActionType[];
}

const GenericMenu = (props: Props) => {
  const {anchorEl, setAnchorEl, actions = []} = props;
  const {t} = useTranslation();
  const settings = useSettings();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';

  const logoutMenuItem = isAuthenticated && {
    label: t('menu.logout'),
    onClick: () => {
      setAnchorEl(null);
      signOut({
        callbackUrl: settings?.['about_link'] || '/',
      });
    },
    id: 'LogoutTabs',
  };
  const aboutMenuItem = {
    label: t('menu.about'),
    onClick: () => {
      window.location.href = settings['about_link'];
      setAnchorEl(null);
    },
    id: 'AboutTabs',
  };
  const languageMenuItem = {
    label: <Languages />,
    id: 'LanguageSelection',
  };

  const validActions = [
    ...actions,
    aboutMenuItem,
    languageMenuItem,
    logoutMenuItem,
  ].filter(Boolean);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {validActions?.map((action, index) => (
        <Action action={action} key={index} />
      ))}
    </Menu>
  );
};

export default GenericMenu;
