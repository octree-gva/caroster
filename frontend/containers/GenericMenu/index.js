import {useState, useEffect, useMemo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import GenericToolbar from './Toolbar';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import useAuthStore from '../../stores/useAuthStore';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';

const GenericMenu = ({title, actions = [], goBack = false}) => {
  const {t} = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const {user} = useProfile();
  const logout = useAuthStore(s => s.logout);
  const settings = useSettings();

  const validActions = useMemo(() => actions.filter(Boolean), [actions]);

  const logoutMenuItem = user && {
    label: t('menu.logout'),
    onClick: () => {
      logout();
      window.location.href = settings['about_link'];
    },
    id: 'LogoutTabs',
  };
  const aboutMenuItem = {
    label: t('menu.about'),
    onClick: () => (window.location.href = settings['about_link']),
    id: 'AboutTabs',
  };
  const userInfos = user
    ? [{label: user.username, id: 'Email'}, {divider: true}]
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
        {goBack && (
          <IconButton
            edge="start"
            className={classes.goBack}
            onClick={() =>
              router.length > 2 ? router.goBack() : router.push('/dashboard')
            }
          >
            <Icon>arrow_back</Icon>
          </IconButton>
        )}
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
              {user ? (
                <Avatar className={classes.avatar}>
                  {`${user.username[0]}`.toUpperCase()}
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
  goBack: {
    color: theme.palette.common.white,
  },
}));

export default GenericMenu;
