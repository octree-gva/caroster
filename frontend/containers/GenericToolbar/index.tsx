import {useState, useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import {useRouter} from 'next/router';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import AppBar from '@mui/material/AppBar';
import useProfile from '../../hooks/useProfile';
import GenericMenu from '../GenericMenu';
import {ActionType} from '../GenericMenu/Action';

const GenericToolbar = ({
  title,
  actions = [],
  goBack = null,
}: {
  title: string;
  actions: Array<ActionType>;
  goBack: () => void | null;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const {profile, connected} = useProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        minHeight: theme.mixins.toolbar.minHeight,
        transition: 'height 0.3s ease',
        display: 'block',
        color: 'text',
        boxShadow: 'none',
        p: theme.spacing(4, 2),
      }}
      id="Menu"
    >
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', px: 0}}>
        <Box sx={{display: 'flex', justifyContent: 'space-start', pl: 0, pr: 1}}>
          {goBack && (
            <IconButton
              edge="start"
              sx={{color: theme.palette.common.black, my: 2}}
              onClick={() =>
                router.basePath.split('/').length > 2
                  ? router.back()
                  : router.push('/dashboard')
              }
              size="large"
            >
              <Icon>chevron_left</Icon>
            </IconButton>
          )}
          <Typography variant="h2" noWrap>
            {title}
          </Typography>
        </Box>
        {actions.length > 0 && (
          <>
            <IconButton
              color="inherit"
              edge="end"
              id="MenuMoreInfo"
              onClick={e => setAnchorEl(e.currentTarget)}
              size="large"
            >
              {connected && profile ? (
                <Avatar
                  sx={{
                    width: theme.spacing(3),
                    height: theme.spacing(3),
                    fontSize: 16,
                  }}
                >
                  {`${profile.username[0]}`.toUpperCase()}
                </Avatar>
              ) : (
                <Icon>more_vert</Icon>
              )}
            </IconButton>

            <GenericMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              actions={[...actions, {divider: true}]}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default GenericToolbar;
