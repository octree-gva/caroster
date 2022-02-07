import {useEffect, useState, useReducer} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import useAuthStore from '../../stores/useAuthStore';
import useEventStore from '../../stores/useEventStore';
import useTourStore from '../../stores/useTourStore';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';
import GenericMenu from '../GenericMenu';
import EventDetails from '../EventDetails';

const EventBar = ({event, onAdd, onSave, onShare}) => {
  const {t} = useTranslation();
  const router = useRouter();
  const [detailsOpen, toggleDetails] = useReducer(i => !i, false);
  const classes = useStyles({detailsOpen});
  const [anchorEl, setAnchorEl] = useState(null);
  const isEditing = useEventStore(s => s.isEditing);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const token = useAuthStore(s => s.token);
  const {user} = useProfile();
  const settings = useSettings();
  const setTour = useTourStore(s => s.setTour);
  const tourStep = useTourStore(s => s.step);

  useEffect(() => {
    onTourChange(toggleDetails);
  }, [tourStep]);

  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = () =>
    router.push({
      pathname: '/auth/register',
      state: {event: event?.id},
    });
  const signIn = () => router.push('/auth/login');
  const goToDashboard = () => router.push('/dashboard');
  const goProfile = () => router.push('/profile');

  const onTourRestart = () => setTour({showWelcome: true});

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
    {
      label: t('menu.tour'),
      onClick: onTourRestart,
      id: 'TourTab',
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
    {
      label: t('menu.tour'),
      onClick: onTourRestart,
      id: 'TourTab',
    },
  ];

  const menuActions = token ? loggedMenuActions : noUserMenuActions;
  const userInfos = user
    ? [{label: user.username, id: 'Email'}, {divider: true}]
    : [];

  return (
    <AppBar
      className={classes.appbar}
      position="static"
      color="primary"
      id={(isEditing && 'EditEvent') || (detailsOpen && 'Details') || 'Menu'}
    >
      <Toolbar>
        <div className={classes.name}>
          <Link href={settings?.['about_link'] || ''}>
            <img className={classes.logo} src="/assets/Logo_in_beta.svg" alt="Logo" />
          </Link>
          <Typography variant="h6" noWrap id="MenuHeaderTitle">
            {event.name}
          </Typography>
          {detailsOpen && (
            <IconButton
              className="tour_event_edit"
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
              className={classes.shareIcon}
              color="inherit"
              edge="end"
              id="ShareBtn"
              onClick={toggleDetails}
            >
              <Icon>share</Icon>
            </IconButton>
            <IconButton
              className={clsx(classes.iconButtons, 'tour_event_infos')}
              color="inherit"
              edge="end"
              id="ShareBtn"
              onClick={toggleDetails}
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
        {!detailsOpen && (
          <GenericMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            actions={[
              ...userInfos,
              ...[
                {
                  label: detailsOpen
                    ? t('event.actions.hide_details')
                    : t('event.actions.show_details'),
                  onClick: e => {
                    setAnchorEl(null);
                    toggleDetails();
                  },
                  id: 'DetailsTab',
                },
              ],
              ...menuActions,
            ]}
          />
        )}
      </Toolbar>
      {detailsOpen && (
        <EventDetails toggleDetails={toggleDetails} onShare={onShare} />
      )}
    </AppBar>
  );
};

const onTourChange = (toggleDetails: Function) => {
  const {prev, step, isCreator} = useTourStore.getState();
  const fromTo = (step1: number, step2: number) =>
    prev === step1 && step === step2;

  if (isCreator) {
    if (fromTo(1, 0) || fromTo(0, 1) || fromTo(3, 2) || fromTo(2, 3))
      toggleDetails();
  } else if (fromTo(2, 3) || fromTo(3, 2)) toggleDetails();
};

const useStyles = makeStyles(theme => ({
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
    width: 64,
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
  shareIcon: {
    marginRight: 0,
  },
}));

export default EventBar;
