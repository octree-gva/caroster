import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import useAuthStore from '../../stores/useAuthStore';
import useEventStore from '../../stores/useEventStore';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';
import GenericMenu from '../GenericMenu';
import EventDetails from '../EventDetails';
import useBannerStore from '../../stores/useBannerStore';
import Banner from '../../components/Banner';

const EventBar = ({event, onAdd, onSave}) => {
  const {t} = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const isEditing = useEventStore(s => s.isEditing);
  const areDetailsOpened = useEventStore(s => s.areDetailsOpened);
  const setIsEditing = useEventStore(s => s.setIsEditing);
  const setAreDetailsOpened = useEventStore(s => s.setAreDetailsOpened);
  const token = useAuthStore(s => s.token);
  const {user} = useProfile();
  const settings = useSettings();
  const bannerOffset = useBannerStore(s => s.offset);
  const bannerHeight = useBannerStore(s => s.height);
  const classes = useStyles({areDetailsOpened, bannerOffset, bannerHeight});
  const announcement = settings?.announcement || '';
  const [lastAnnouncementSeen, setLastAnnouncementSeen] = useState(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('lastAnnouncementSeen')
      : ''
  );
  const showAnnouncement =
    announcement !== '' && announcement !== lastAnnouncementSeen;

  const onBannerClear = () => {
    if (typeof announcement != 'undefined') {
      localStorage.setItem('lastAnnouncementSeen', String(announcement));
    }
    setLastAnnouncementSeen(announcement);
  };

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

  const menuActions = token ? loggedMenuActions : noUserMenuActions;
  const userInfos = user
    ? [{label: user.username, id: 'Email'}, {divider: true}]
    : [];

  const appLink = user ? '/dashboard' : `/e/${event.uuid}` || '';

  const UserIcon = user ? (
    <Avatar className={classes.avatar}>
      {`${user.username[0]}`.toUpperCase()}
    </Avatar>
  ) : (
    <Icon>more_vert</Icon>
  );

  return (
    <AppBar
      className={classes.appbar}
      position="fixed"
      color="primary"
      id={
        (isEditing && 'EditEvent') || (areDetailsOpened && 'Details') || 'Menu'
      }
    >
      <Banner
        message={announcement}
        open={showAnnouncement}
        onClear={onBannerClear}
      />
      <Toolbar>
        <div className={classes.name}>
          <Link href={appLink}>
            <img
              className={classes.logo}
              src="/assets/Logo_in_beta.svg"
              alt="Logo"
            />
          </Link>
          <Tooltip title={event.name}>
            <Typography
              variant="h6"
              noWrap
              id="MenuHeaderTitle"
              className={classes.title}
            >
              {event.name}
            </Typography>
          </Tooltip>

          {areDetailsOpened && (
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
        {areDetailsOpened ? (
          <IconButton
            color="inherit"
            edge="end"
            id="CloseDetailsBtn"
            onClick={() => {
              setIsEditing(false);
              setAreDetailsOpened(!areDetailsOpened);
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
              onClick={() => setAreDetailsOpened(!areDetailsOpened)}
            >
              <Icon>share</Icon>
            </IconButton>
            <IconButton
              color="inherit"
              edge="end"
              id="MenuMoreInfo"
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              {UserIcon}
            </IconButton>
          </>
        )}
        {!areDetailsOpened && (
          <GenericMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            actions={[
              ...userInfos,
              ...[
                {
                  label: areDetailsOpened
                    ? t('event.actions.hide_details')
                    : t('event.actions.show_details'),
                  onClick: e => {
                    setAnchorEl(null);
                    setAreDetailsOpened(!areDetailsOpened);
                  },
                  id: 'DetailsTab',
                },
              ],
              ...menuActions,
            ]}
          />
        )}
      </Toolbar>
      {areDetailsOpened && <EventDetails />}
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  appbar: ({detailsOpen, bannerOffset, bannerHeight}) => ({
    overflow: 'hidden',
    minHeight: detailsOpen ? '100vh' : theme.mixins.toolbar.minHeight,
    overflowY: detailsOpen ? 'scroll' : 'hidden',
    transition: 'height 0.3s ease',
    marginTop: bannerOffset - bannerHeight,
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
