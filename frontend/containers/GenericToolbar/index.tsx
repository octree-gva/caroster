import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import useProfile from '../../hooks/useProfile';
import GenericMenu from '../GenericMenu';
import {ActionType} from '../GenericMenu/Action';
import useBannerStore from '../../stores/useBannerStore';
import Banner from '../../components/Banner';
import useSettings from '../../hooks/useSettings';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const bannerOffset = useBannerStore(s => s.offset);
  const bannerHeight = useBannerStore(s => s.height);
  const classes = useStyles({bannerOffset, bannerHeight});
  const {user} = useProfile();
  const settings = useSettings();
  const [lastAnnouncementSeen, setLastAnnouncementSeen] = useState(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('lastAnnouncementSeen')
      : ''
  );
  const announcement = settings?.announcement || '';
  const showAnnouncement =
    announcement !== '' && announcement !== lastAnnouncementSeen;

  const onBannerClear = () => {
    if (typeof announcement != 'undefined') {
      localStorage.setItem('lastAnnouncementSeen', String(announcement));
    }
    setLastAnnouncementSeen(announcement);
  };

  const userInfos = user
    ? [{label: user.username, id: 'Email'}, {divider: true}]
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.appbar}
      id="Menu"
    >
      <Banner
        message={announcement}
        open={showAnnouncement}
        onClear={onBannerClear}
      />
      <Toolbar>
        {goBack && (
          <IconButton
            edge="start"
            className={classes.goBack}
            onClick={() =>
              router.basePath.split('/').length > 2
                ? router.back()
                : router.push('/dashboard')
            }
          >
            <Icon>arrow_back</Icon>
          </IconButton>
        )}
        <div className={classes.name}>
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
            >
              {user ? (
                <Avatar className={classes.avatar}>
                  {`${user.username[0]}`.toUpperCase()}
                </Avatar>
              ) : (
                <Icon>more_vert</Icon>
              )}
            </IconButton>

            <GenericMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              actions={[...userInfos, ...actions, {divider: true}]}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  appbar: ({bannerHeight, bannerOffset}) => ({
    minHeight: theme.mixins.toolbar.minHeight,
    transition: 'height 0.3s ease',
    display: 'block',
    marginTop: bannerOffset - bannerHeight,
  }),
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 16,
  },
  goBack: {
    color: theme.palette.common.white,
  },
}));

export default GenericToolbar;
