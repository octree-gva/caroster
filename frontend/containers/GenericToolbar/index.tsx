import {useState, useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import {useRouter} from 'next/router';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
      color="primary"
      sx={{
        minHeight: theme.mixins.toolbar.minHeight,
        transition: 'height 0.3s ease',
        display: 'block',
        backgroundColor: '#242424',
        color: 'white',
      }}
      id="Menu"
    >
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        {goBack && (
          <IconButton
            edge="start"
            sx={{color: theme.palette.common.white}}
            onClick={() =>
              router.basePath.split('/').length > 2
                ? router.back()
                : router.push('/dashboard')
            }
            size="large"
          >
            <Icon>arrow_back</Icon>
          </IconButton>
        )}
        <div sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <Typography variant="h6" noWrap id="MenuHeaderTitle">
            {title}
          </Typography>
        </div>
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
