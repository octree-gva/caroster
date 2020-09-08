import React, {useEffect, useState, useReducer} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useHistory, Link} from 'react-router-dom';
import {useStrapi, useAuth} from 'strapi-react-context';
import EventMenu from '../EventMenu';
import EventDetails from '../EventDetails';
import {ReactComponent as CarosterLogo} from './logo.svg';

const EventBar = ({event, isEditing, setIsEditing, onAdd, onSave, onShare}) => {
  const {t} = useTranslation();
  const history = useHistory();
  const [detailsOpen, toggleDetails] = useReducer(i => !i, false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles({detailsOpen});
  const {token} = useAuth();
  const strapi = useStrapi();
  const [settings] = strapi.stores?.settings || [{}];
  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = () =>
    history.push({
      pathname: '/register',
      state: {event: event?.id},
    });
  const signIn = () => history.push('/login');
  const goToDashboard = () => history.push('/dashboard');
  const goProfile = () => history.push('/profile');

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

  return (
    <AppBar
      position="static"
      color="primary"
      className={classes.appbar}
      id={(isEditing && 'EditEvent') || (detailsOpen && 'Details') || 'Menu'}
    >
      <Toolbar>
        <div className={classes.name}>
          <Link
            onClick={() => {
              window.location.href = settings['about_link'];
            }}
          >
            <CarosterLogo className={classes.logo} title="" />
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
              onClick={onShare}
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
            ...menuActions,
          ]}
        />
      </Toolbar>
      {detailsOpen && (
        <Container className={classes.container} maxWidth="sm">
          <EventDetails toggleDetails={toggleDetails} />
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
  },
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: theme.spacing(0),
  },
  withDivider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default EventBar;
