import Menu from '@material-ui/core/Menu';
import {useTranslation} from 'react-i18next';
import useAuthStore from '../../stores/useAuthStore';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';
import Languages from '../Languages/MenuItem';
import Action from './Action';

const GenericMenu = ({anchorEl, setAnchorEl, actions = []}) => {
  const {t} = useTranslation();
  const settings = useSettings();
  const logout = useAuthStore(s => s.logout);
  const {user} = useProfile();

  const logoutMenuItem = user && {
    label: t('menu.logout'),
    onClick: () => {
      logout();
      window.location.href = settings['about_link'];
      setAnchorEl(null);
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
