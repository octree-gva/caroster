import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useEvent} from '../../contexts/Event';
import {useToast} from '../../contexts/Toast';
import EventMenu from './EventMenu';
import EventDetails from '../EventDetails';
import {useHistory} from 'react-router-dom';

const EventAppBar = ({detailsOpen, toggleDetails, setIsAddToMyEvent}) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {addToast} = useToast();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles({detailsOpen});
  const {event, isEditing, setIsEditing, updateEvent} = useEvent();
  const {token} = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const onEventSave = async e => {
    try {
      await updateEvent();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      addToast(t('event.errors.cant_update'));
    }
  };

  const onShare = async eventName => {
    if (!eventName) return null;
    // If navigator as share capability
    if (!!navigator.share)
      return await navigator.share({
        title: `Caroster ${eventName}`,
        url: `${window.location.href}`,
      });
    // Else copy URL in clipboard
    else if (!!navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      addToast(t('event.actions.copied'));
      return true;
    }
  };

  const addToMyEvents = () => {
    if (!event) return;
    window.localStorage.setItem('addToMyEvents', event.id);
    setIsAddToMyEvent(true);
  };

  const signUp = () => {
    if (!event) return;
    history.push({
      pathname: '/register',
      state: {event: event.id},
    });
  };

  const signIn = history.push.bind(undefined, '/login');
  const goToDashboard = history.push.bind(undefined, '/dashboard');
  const goProfile = history.push.bind(undefined, '/profile');
  const goAbout = () => (window.location.href = t('meta.about_href'));

  return (
    <AppBar
      position="static"
      color="primary"
      className={classes.appbar}
      id={(isEditing && 'EditEvent') || (detailsOpen && 'Details') || 'Menu'}
    >
      <Toolbar>
        <div className={classes.name}>
          <Typography variant="h6" noWrap id="MenuHeaderTitle">
            {event.name}
          </Typography>
          {detailsOpen && !isEditing && (
            <IconButton
              color="inherit"
              edge="end"
              id="CloseDetailsBtn"
              onClick={() => setIsEditing(true)}
            >
              <Icon>edit</Icon>
            </IconButton>
          )}
          {detailsOpen && isEditing && (
            <IconButton
              color="inherit"
              edge="end"
              id="EditEventSubmit"
              onClick={onEventSave}
            >
              <Icon>done</Icon>
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
              onClick={onShare.bind(undefined, event?.name)}
              className={classes.shareIcon}
            >
              <Icon>share</Icon>
            </IconButton>
            <IconButton
              color="inherit"
              edge="end"
              id="MenuMoreInfo"
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <Icon>more_vert</Icon>
            </IconButton>
          </>
        )}
        <EventMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          actions={[
            {
              label: detailsOpen
                ? t('event.actions.hide_details')
                : t('event.actions.show_details'),
              onClick: toggleDetails,
              id: 'DetailsTab',
            },
            !token && {
              label: t('event.actions.add_to_my_events'),
              onClick: addToMyEvents,
              id: 'AddToMyEventsTab',
            },
            !!token && {
              label: t('menu.dashboard'),
              onClick: goToDashboard,
              id: 'GoToDashboardTab',
            },
            !token && {
              label: t('menu.login'),
              onClick: signIn,
              id: 'SignInTab',
            },
            !token && {
              label: t('menu.register'),
              onClick: signUp,
              id: 'SignUpTab',
            },
            !!token && {
              label: t('menu.profile'),
              onClick: goProfile,
              id: 'ProfileTab',
            },
            {
              label: t('menu.about'),
              onClick: goAbout,
              id: 'AboutTab',
            },
          ].filter(Boolean)}
        />
      </Toolbar>
      <Container className={classes.container} maxWidth="sm">
        <EventDetails toggleDetails={toggleDetails} />
      </Container>
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
    transition: 'height 0.3s ease',
    zIndex: theme.zIndex.appBar,
    position: 'fixed',
    top: 0,
  }),
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: theme.spacing(0),
  },
}));

export default EventAppBar;
