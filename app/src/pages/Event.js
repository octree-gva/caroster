import React, {useState, useReducer, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import {useEvent, EventProvider} from '../contexts/Event';
import {useToast} from '../contexts/Toast';
import Layout from '../layouts/Default';
import Loading from '../pages/Loading';
import EventMenu from '../containers/EventMenu';
import EventDetails from '../containers/EventDetails';
import EventFab from '../containers/EventFab';
import CarColumns from '../containers/CarColumns';
import NewCarDialog from '../containers/NewCarDialog';

const Event = () => {
  const {t} = useTranslation();
  const {addToast} = useToast();
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailsOpen, toggleDetails] = useReducer(i => !i, false);
  const classes = useStyles({detailsOpen});
  const [openNewCar, toggleNewCar] = useReducer(i => !i, false);
  const {event, isEditing, setIsEditing, updateEvent} = useEvent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const onEventSave = async e => {
    try {
      await updateEvent();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      addToast(t('event.errors.cant_update'));
    }
  };

  const onShare = async () => {
    if (!event) return null;
    // If navigator as share capability
    if (!!navigator.share)
      return await navigator.share({
        title: `Caroster ${event.name}`,
        url: `${window.location.href}`,
      });
    // Else copy URL in clipboard
    else if (!!navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      addToast(t('event.actions.copied'));
      return true;
    }
  };

  if (!event) return <Loading />;

  return (
    <Layout>
      <AppBar
        position="static"
        color="primary"
        className={classes.appbar}
        id={(isEditing && 'EditEvent') || (detailsOpen && 'Details') || 'Menu'}
      >
        <Toolbar>
          <div className={classes.name}>
            <Typography variant="h6" noWrap id="MenuHeaderTitle">
              {event.name}
            </Typography>
            {detailsOpen && !isEditing && (
              <IconButton
                color="inherit"
                edge="end"
                id="CloseDetailsBtn"
                onClick={() => setIsEditing(true)}
              >
                <Icon>edit</Icon>
              </IconButton>
            )}
            {detailsOpen && isEditing && (
              <IconButton
                color="inherit"
                edge="end"
                id="EditEventSubmit"
                onClick={onEventSave}
              >
                <Icon>done</Icon>
              </IconButton>
            )}
          </div>
          {!detailsOpen && (
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
          {detailsOpen && (
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
              {
                label: t('event.actions.add_car'),
                onClick: toggleNewCar,
                id: 'NewCarTab',
              },
              {
                label: t('event.actions.invite'),
                onClick: () => {},
                id: 'InviteTab',
              },
            ]}
          />
        </Toolbar>
        <Container className={classes.container} maxWidth="sm">
          <EventDetails toggleDetails={toggleDetails} />
        </Container>
      </AppBar>
      <CarColumns toggleNewCar={toggleNewCar} />
      <EventFab toggleNewCar={toggleNewCar} open={openNewCar} />
      <NewCarDialog open={openNewCar} toggle={toggleNewCar} />
    </Layout>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  appbar: ({detailsOpen}) => ({
    overflow: 'hidden',
    height: detailsOpen ? '100vh' : theme.mixins.toolbar.minHeight,
    transition: 'height 0.3s ease',
    zIndex: theme.zIndex.appBar,
    position: 'fixed',
    top: 0,
  }),
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: theme.spacing(0),
  },
}));

const EventWithContext = props => (
  <EventProvider {...props}>
    <Event {...props} />
  </EventProvider>
);
export default EventWithContext;
