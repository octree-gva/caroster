import React, {useState, useReducer, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import TextField from '../components/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import Layout from '../layouts/Default';
import EventMenu from '../containers/EventMenu';
import EventDetails from '../containers/EventDetails';
import EventFab from '../containers/EventFab';
import {useEvent, EventProvider} from '../contexts/Event';
import CarColumns from '../containers/CarColumns';
import {useToast} from '../contexts/Toast';
import NewCarDialog from '../containers/NewCarDialog';
import Loading from '../pages/Loading';

const Event = () => {
  const {t} = useTranslation();
  const {addToast} = useToast();
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailsOpen, toggleDetails] = useReducer(i => !i, false);
  const classes = useStyles({detailsOpen});
  const [openNewCar, toggleNewCar] = useReducer(i => !i, false);
  const {
    event,
    isEditing,
    setIsEditing,
    editingEvent,
    setEditingEvent,
    updateEvent,
  } = useEvent();

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

  if (!event) return <Loading />;

  return (
    <Layout>
      <AppBar
        position="static"
        className={classes.appbar}
        id={(isEditing && 'EditEvent') || (detailsOpen && 'Details') || 'Menu'}
      >
        <Toolbar>
          {isEditing ? (
            <TextField
              light
              value={editingEvent.name ?? event.name}
              onChange={e =>
                setEditingEvent({...editingEvent, name: e.target.value})
              }
              id="EditEventName"
              name="name"
            />
          ) : (
            <Typography
              variant="h6"
              className={classes.name}
              id="MenuHeaderTitle"
            >
              {event.name}
            </Typography>
          )}
          {!detailsOpen && (
            <IconButton
              edge="end"
              id="MenuMoreInfo"
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <Icon className={classes.barIcon}>more_vert</Icon>
            </IconButton>
          )}
          {detailsOpen && !isEditing && (
            <IconButton
              edge="end"
              id="DetailsEditBtn"
              onClick={e => setIsEditing(true)}
            >
              <Icon className={classes.barIcon}>edit</Icon>
            </IconButton>
          )}
          {detailsOpen && isEditing && (
            <IconButton edge="end" id="EditEventSubmit" onClick={onEventSave}>
              <Icon className={classes.barIcon}>done</Icon>
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
      <EventFab toggleNewCar={toggleNewCar} />
      <NewCarDialog open={openNewCar} toggle={toggleNewCar} />
    </Layout>
  );
};

const useStyles = makeStyles(theme => ({
  container: {padding: theme.spacing(2)},
  appbar: ({detailsOpen}) => ({
    transition: 'height 0.3s ease',
    overflow: 'hidden',
    height: detailsOpen ? '100vh' : theme.mixins.toolbar.minHeight,
    zIndex: theme.zIndex.appBar,
  }),
  name: {
    flexGrow: 1,
  },
  barIcon: {
    color: 'white',
  },
}));

const EventWithContext = props => (
  <EventProvider {...props}>
    <Event {...props} />
  </EventProvider>
);
export default EventWithContext;
