import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import useProfile from '../../hooks/useProfile';
import useShare from '../../hooks/useShare';
import GenericMenu from '../GenericMenu';

const EventBar = ({event, onAdd}) => {
  const {t} = useTranslation();
  const router = useRouter();
  const {share} = useShare();
  const [anchorEl, setAnchorEl] = useState(null);
  const {profile, connected} = useProfile();
  const classes = useStyles();

  const signUp = () =>
    router.push({
      pathname: '/auth/register',
      state: {event: event?.id},
    });
  const signIn = () => router.push('/auth/login');
  const goToDashboard = () => router.push('/dashboard');
  const goProfile = () => router.push('/profile');

  const noUserMenuActions = [
    {
      label: t('event.actions.add_to_my_events'),
      onClick: () => {
        onAdd(true);
      },
      id: 'AddToMyEventsTab',
    },
    {divider: true},
    {
      label: t('menu.login'),
      onClick: signIn,
      id: 'SignInTab',
    },
    {
      label: t('menu.register'),
      onClick: signUp,
      id: 'SignUpTab',
    },
    {divider: true},
  ];

  const loggedMenuActions = [
    {
      label: t('menu.dashboard'),
      onClick: goToDashboard,
      id: 'GoToDashboardTab',
    },
    {
      label: t('menu.profile'),
      onClick: goProfile,
      id: 'ProfileTab',
    },
    {divider: true},
  ];

  const menuActions = connected ? loggedMenuActions : noUserMenuActions;
  const appLink = connected ? '/dashboard' : `/e/${event.uuid}` || '';
  const userInfos = profile
    ? [{label: profile.username, id: 'Email'}, {divider: true}]
    : [];

  const UserIcon = profile ? (
    <Avatar className={classes.avatar}>
      {`${profile.username[0]}`.toUpperCase()}
    </Avatar>
  ) : (
    <Icon>more_vert</Icon>
  );

  return (
    <AppBar
      className={classes.appbar}
      color="primary"
      position="static"
      id="Menu"
    >
      <Toolbar>
        <div className={classes.name}>
          <Link href={appLink}>
            <img
              className={classes.logo}
              src="/assets/Logo_in_beta.svg"
              alt="Logo"
            />
          </Link>
          <Tooltip title={event.name || ''}>
            <Typography
              variant="h6"
              noWrap
              id="MenuHeaderTitle"
              className={classes.title}
            >
              {event.name}
            </Typography>
          </Tooltip>
        </div>
        <>
          <IconButton
            className={classes.shareIcon}
            color="inherit"
            edge="end"
            id="ShareBtn"
            onClick={() =>
              share({
                title: `Caroster ${event.name}`,
                url: `${window.location.href}`,
              })
            }
          >
            <Icon>share</Icon>
          </IconButton>
          {
            <GenericMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              actions={[...userInfos, ...menuActions]}
            />
          }
          <IconButton
            color="inherit"
            edge="end"
            id="MenuMoreInfo"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            {UserIcon}
          </IconButton>
        </>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  appbar: () => ({
    overflow: 'hidden',
    minHeight: theme.mixins.toolbar.minHeight,
    overflowY: 'hidden',
    transition: 'height 0.3s ease',
  }),
  logo: {
    marginRight: theme.spacing(2),
    width: 64,
    height: 32,
    cursor: 'pointer',
  },
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    maxWidth: `calc(100vw - ${theme.spacing(30)}px)`,
  },
  iconButtons: {
    margin: theme.spacing(0),
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 16,
  },
  shareIcon: {
    marginRight: 0,
  },
}));

export default EventBar;
