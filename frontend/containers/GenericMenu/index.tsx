import Menu from '@mui/material/Menu';
import {useTranslation} from 'react-i18next';
import {signOut, useSession} from 'next-auth/react';
import useSettings from '../../hooks/useSettings';
import Languages from '../Languages/MenuItem';
import Action, {ActionType} from './Action';
import ExternalLink from './ExternalLink';
import {Chip, Typography} from '@mui/material';

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

  const supportItem = {
    label: (
      <ExternalLink
        id="SupportCaroster"
        url={settings['opencollective_link']}
        label={
          <Typography variant="caption" color="textSecondary">
            <Chip
              label={t`supportCaroster`}
              color="secondary"
              sx={{fontDecoration: 'none', cursor: 'pointer'}}
            />
          </Typography>
        }
      ></ExternalLink>
    ),
  };
  const languageMenuItem = {
    label: <Languages />,
    id: 'LanguageSelection',
  };
  const aboutMenuItem = {
    label: (
      <ExternalLink
        id="AboutCaroster"
        url={settings['about_link']}
        label={
          <Typography variant="caption" color="textSecondary">
            {t('menu.about')}
          </Typography>
        }
      ></ExternalLink>
    ),
  };
  const sourceCodeItem = {
    label: (
      <ExternalLink
        id="SourceCode"
        url={settings['code_link']}
        label={
          <Typography variant="caption" color="textSecondary">
            {t('menu.code')}
          </Typography>
        }
      ></ExternalLink>
    ),
  };
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

  const validActions = [
    ...actions,
    supportItem,
    languageMenuItem,
    logoutMenuItem,
    {divider: true},
    aboutMenuItem,
    sourceCodeItem,
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
