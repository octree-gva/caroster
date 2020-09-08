import React, {useState, useEffect, useMemo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import GenericToolbar from './Toolbar';
import {useTranslation} from 'react-i18next';
import {useStrapi, useAuth} from 'strapi-react-context';

const GenericMenu = ({title, actions = []}) => {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const strapi = useStrapi();
  const {logout, authState} = useAuth();
  const [settings] = strapi.stores?.settings || [{}];
  const validActions = useMemo(() => actions.filter(Boolean), [actions]);

  const logoutMenuItem = authState?.user
    ? {label: t('menu.logout'), onClick: logout, id: 'LogoutTabs'}
    : null;
  const aboutMenuItem = {
    label: t('menu.about'),
    onClick: () => (window.location.href = settings['about_link']),
    id: 'AboutTabs',
  };
  const userInfos = authState?.user
    ? [{label: authState.user.username, id: 'Email'}, {divider: true}]
    : [];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppBar
      position="static"
      color="primary"
      className={classes.appbar}
      id="Menu"
    >
      <Toolbar>
        <div className={classes.name}>
          <Typography variant="h6" noWrap id="MenuHeaderTitle">
            {title}
          </Typography>
        </div>
        {validActions.length > 0 && (
          <>
            <IconButton
              color="inherit"
              edge="end"
              id="MenuMoreInfo"
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              {authState?.user ? (
                <Avatar className={classes.avatar}>
                  {`${authState.user.username[0]}`.toUpperCase()}
                </Avatar>
              ) : (
                <Icon>more_vert</Icon>
              )}
            </IconButton>

            <GenericToolbar
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              actions={[
                ...userInfos,
                ...validActions,
                {divider: true},
                aboutMenuItem,
                logoutMenuItem,
              ].filter(Boolean)}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  appbar: {
    overflow: 'hidden',
    height: theme.mixins.toolbar.minHeight,
    transition: 'height 0.3s ease',
    zIndex: theme.zIndex.appBar,
    position: 'fixed',
    top: 0,
  },
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: theme.spacing(0),
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 16,
  },
}));

export default GenericMenu;
