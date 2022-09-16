import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import useProfile from '../../hooks/useProfile';
import useShare from '../../hooks/useShare';
import GenericMenu from '../GenericMenu';
import useActions from './useActions';
import UserIcon from './UserIcon';

const EventBar = ({event, onAdd}) => {
  const {share} = useShare();
  const [anchorEl, setAnchorEl] = useState(null);
  const {profile, connected} = useProfile();
  const classes = useStyles();
  const menuActions = useActions({onAdd, eventId: event?.id});
  const appLink = connected ? '/dashboard' : `/e/${event.uuid}` || '';
  const userInfos = profile
    ? [{label: profile.username, id: 'Email'}, {divider: true}]
    : [];

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
            <UserIcon />
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
  shareIcon: {
    marginRight: 0,
  },
}));

export default EventBar;
