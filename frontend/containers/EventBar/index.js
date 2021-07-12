import {useEffect, useState, useReducer} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/router';
import Link from 'next/link';
import EventMenu from '../EventMenu';
import EventDetails from '../EventDetails';
import useAuthStore from '../../stores/useAuthStore';
import useEventStore from '../../stores/useEventStore';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';

const EventBar = ({event, onAdd, onSave, onShare}) => {
  const {t} = useTranslation();
  const router = useRouter();
  const [detailsOpen, toggleDetails] = useReducer(i => !i, false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isEditing = useEventStore(s => s.isEditing);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const classes = useStyles({detailsOpen});
  const token = useAuthStore(s => s.token);
  const {user} = useProfile();
  const settings = useSettings();

  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = () =>
    router.push({
      pathname: '/register',
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

  const menuActions = token ? loggedMenuActions : noUserMenuActions;
  const userInfos = user
    ? [{label: user.username, id: 'Email'}, {divider: true}]
    : [];

  return (
    <AppBar
      position="static"
      color="primary"
      className={classes.appbar}
      id={(isEditing && 'EditEvent') || (detailsOpen && 'Details') || 'Menu'}
    >
      <Toolbar>
        <div className={classes.name}>
          <Link href={settings?.['about_link'] || ''}>
            <img className={classes.logo} src="/assets/logo.svg" alt="Logo" />
          </Link>
          <Typography variant="h6" noWrap id="MenuHeaderTitle">
            {event.name}
          </Typography>
          {detailsOpen && (
            <IconButton
              color="inherit"
              edge="end"
              id="HeaderAction"
              onClick={isEditing ? onSave : () => setIsEditing(true)}
            >
              <Icon>{isEditing ? 'done' : 'edit'}</Icon>
            </IconButton>
          )}
        </div>
        {detailsOpen ? (
          <IconButton
            color="inherit"
            edge="end"
            id="CloseDetailsBtn"
            onClick={() => {
              setIsEditing(false);
              toggleDetails();
            }}
          >
            <Icon>close</Icon>
          </IconButton>
        ) : (
          <>
            <IconButton
              color="inherit"
              edge="end"
              id="ShareBtn"
              onClick={toggleDetails}
              className={classes.shareIcon}
            >
              <Icon>share</Icon>
            </IconButton>
            <IconButton
              color="inherit"
              edge="end"
              id="ShareBtn"
              onClick={toggleDetails}
              className={classes.iconButtons}
            >
              <Icon>information_outline</Icon>
            </IconButton>
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
          </>
        )}
        <EventMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          actions={[
            ...userInfos,
            ...[
              {
                label: detailsOpen
                  ? t('event.actions.hide_details')
                  : t('event.actions.show_details'),
                onClick: toggleDetails,
                id: 'DetailsTab',
              },
            ],
            ...menuActions,
          ]}
        />
      </Toolbar>
      {detailsOpen && (
        <Container className={classes.container} maxWidth="sm">
          <EventDetails toggleDetails={toggleDetails} onShare={onShare} />
        </Container>
      )}
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  appbar: ({detailsOpen}) => ({
    overflow: 'hidden',
    height: detailsOpen ? '100vh' : theme.mixins.toolbar.minHeight,
    overflowY: detailsOpen ? 'scroll' : 'hidden',
    transition: 'height 0.3s ease',
    zIndex: theme.zIndex.appBar,
    position: 'fixed',
    top: 0,
  }),
  logo: {
    marginRight: theme.spacing(2),
    width: 32,
    height: 32,
    cursor: 'pointer',
  },
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  iconButtons: {
    margin: theme.spacing(0),
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 16,
  },
  withDivider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default EventBar;
