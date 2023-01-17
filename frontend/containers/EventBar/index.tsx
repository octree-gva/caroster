import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import {useState} from 'react';
import useProfile from '../../hooks/useProfile';
import useShare from '../../hooks/useShare';
import GenericMenu from '../GenericMenu';
import useActions from './useActions';
import UserIcon from './UserIcon';

const EventBar = ({event, onAdd}) => {
  const {share} = useShare();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const {connected} = useProfile();

  const menuActions = useActions({onAdd, eventId: event?.id});
  const appLink = connected ? '/dashboard' : `/e/${event.uuid}` || '';

  return (
    <AppBar
      sx={{
        overflow: 'hidden',
        minHeight: theme.mixins.toolbar.minHeight,
        overflowY: 'hidden',
        transition: 'height 0.3s ease',
        backgroundColor: '#242424',
        color: 'white',
      }}
      color="primary"
      position="static"
      id="Menu"
    >
      <Toolbar>
        <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <Link href={appLink}>
            <Box
              sx={{
                marginRight: theme.spacing(2),
                width: 64,
                height: 32,
                cursor: 'pointer',
              }}
            >
              <img src="/assets/Logo_in_beta.svg" alt="Logo" />
            </Box>
          </Link>
          <Tooltip title={event.name || ''}>
            <Typography
              variant="h6"
              noWrap
              id="MenuHeaderTitle"
              sx={{maxWidth: `calc(100vw - ${theme.spacing(30)})`}}
            >
              {event.name}
            </Typography>
          </Tooltip>
        </Box>
        <>
          <IconButton
            sx={{marginRight: 0}}
            color="inherit"
            edge="end"
            id="ShareBtn"
            onClick={() =>
              share({
                title: `Caroster ${event.name}`,
              })
            }
            size="large"
          >
            <Icon>share</Icon>
          </IconButton>
          <GenericMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            actions={menuActions}
          />
          <IconButton
            color="inherit"
            edge="end"
            id="MenuMoreInfo"
            onClick={e => setAnchorEl(e.currentTarget)}
            size="large"
          >
            <UserIcon />
          </IconButton>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default EventBar;
