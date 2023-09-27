import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import {useState} from 'react';
import useShare from '../../hooks/useShare';
import GenericMenu from '../GenericMenu';
import useActions from './useActions';
import UserIcon from './UserIcon';
import {useTheme} from '@mui/styles';

const EventBar = ({event, onAdd}) => {
  const {share} = useShare();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const menuActions = useActions({onAdd, eventId: event?.id});
  
  return (
    <AppBar
      sx={{
        top: 0,
        right: 0,
        overflow: 'hidden',
        minHeight: theme.mixins.toolbar.minHeight,
        transition: 'height 0.3s ease',
        backgroundColor: 'transparent',
        backgroundImage: `linear-gradient(${theme.palette.background.grey} 0%, rgba(0,0,0,0) 90%)`,

        [theme.breakpoints.up('md')]: {
          width: 'calc(100% - 240px)',
        },
      }}
      position="absolute"
      elevation={0}
      id="Menu"
    >
      <Toolbar>
        <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
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
