import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/styles';
import useShare from '../../hooks/useShare';
import GenericMenu from '../GenericMenu';
import useActions from './useActions';
import UserIcon from './UserIcon';
import DrawerNotification from '../DrawerNotification';
import useProfile from '../../hooks/useProfile';
import {Chip, useMediaQuery} from '@mui/material';
import LinkedEventSwitch from './LinkedEventSwitch';

const EventBar = ({event, onAdd, goBack, title}) => {
  const {connected} = useProfile();
  const theme = useTheme();
  const {share} = useShare();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuActions = useActions({onAdd, eventId: event?.id});
  const isCarosterPlusEvent = event?.enabled_modules?.includes('caroster-plus');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      sx={{
        top: 0,
        right: 0,
        width: '100%',
        overflow: 'hidden',
        minHeight: theme.mixins.toolbar.minHeight,
        transition: 'height 0.3s ease',
        backgroundColor: 'transparent',
        backgroundImage: `linear-gradient(${theme.palette.background.grey} 0%, rgba(0,0,0,0) 90%)`,
      }}
      position="absolute"
      elevation={0}
      id="Menu"
    >
      <Toolbar>
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="space-start"
          alignItems="center"
          pr={1}
          gap={1}
        >
          {goBack && (
            <IconButton
              sx={{color: 'inherit'}}
              edge="start"
              onClick={goBack}
              size="large"
            >
              <Icon>chevron_left</Icon>
            </IconButton>
          )}
          <Tooltip title={title || event.name || ''}>
            <Typography
              variant="h6"
              noWrap
              sx={{maxWidth: `calc(100vw - ${theme.spacing(28)})`}}
            >
              {title || event.name}
            </Typography>
          </Tooltip>
          {isCarosterPlusEvent && (
            <Chip
              label="Plus"
              size="small"
              variant="outlined"
              sx={{color: 'white', borderColor: 'white'}}
            />
          )}
          {!isMobile && <LinkedEventSwitch />}
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
          {connected && <DrawerNotification />}
          <IconButton
            color="inherit"
            edge="end"
            id="MenuMoreInfo"
            onClick={e => setAnchorEl(e.currentTarget)}
            size="large"
          >
            <UserIcon />
          </IconButton>
          <GenericMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            actions={menuActions}
          />
        </>
      </Toolbar>
      {isMobile && <LinkedEventSwitch />}
    </AppBar>
  );
};

export default EventBar;
