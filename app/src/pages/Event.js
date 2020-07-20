import React, {useState, useReducer, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useEvent, EventProvider} from '../contexts/Event';
import Layout from '../layouts/Default';
import Loading from './Loading';
import EventAppBar from '../containers/EventAppBar';
import EventFab from '../containers/EventFab';
import CarColumns from '../containers/CarColumns';
import NewCarDialog from '../containers/NewCarDialog';
import AddToMyEventDialog from '../containers/AddToMyEventDialog';

const Event = () => {
  const {t} = useTranslation();
  const [isAddToMyEvent, setIsAddToMyEvent] = useState(false);
  const [detailsOpen, toggleDetails] = useReducer(i => !i, false);
  const [openNewCar, toggleNewCar] = useReducer(i => !i, false);
  const {event, setIsEditing} = useEvent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!event) return <Loading />;

  return (
    <Layout title={t('meta.event_title', {event})}>
      <EventAppBar
        detailsOpen={detailsOpen}
        toggleDetails={toggleDetails}
        setIsAddToMyEvent={setIsAddToMyEvent}
      />
      <CarColumns toggleNewCar={toggleNewCar} />
      <EventFab toggleNewCar={toggleNewCar} open={openNewCar} />
      <NewCarDialog open={openNewCar} toggle={toggleNewCar} />
      <AddToMyEventDialog
        open={isAddToMyEvent}
        onClose={() => setIsAddToMyEvent(false)}
        event={event}
      />
    </Layout>
  );
};

// const EventWithContext = props => (
//   <EventProvider {...props}>
//     <Event {...props} />
//   </EventProvider>
// );
// export default EventWithContext;

// <AppBar
// position="static"
// color="primary"
// className={classes.appbar}
// id={(isEditing && 'EditEvent') || (detailsOpen && 'Details') || 'Menu'}
// >
// <Toolbar>
//   <div className={classes.name}>
//     <Typography variant="h6" noWrap id="MenuHeaderTitle">
//       {event.name}
//     </Typography>
//     {detailsOpen && !isEditing && (
//       <IconButton
//         color="inherit"
//         edge="end"
//         id="CloseDetailsBtn"
//         onClick={() => setIsEditing(true)}
//       >
//         <Icon>edit</Icon>
//       </IconButton>
//     )}
//     {detailsOpen && isEditing && (
//       <IconButton
//         color="inherit"
//         edge="end"
//         id="EditEventSubmit"
//         onClick={onEventSave}
//       >
//         <Icon>done</Icon>
//       </IconButton>
//     )}
//   </div>
//   {!detailsOpen && (
//     <>
//       <IconButton
//         color="inherit"
//         edge="end"
//         id="ShareBtn"
//         onClick={onShare}
//         className={classes.shareIcon}
//       >
//         <Icon>share</Icon>
//       </IconButton>
//       <IconButton
//         color="inherit"
//         edge="end"
//         id="MenuMoreInfo"
//         onClick={e => setAnchorEl(e.currentTarget)}
//       >
//         <Icon>more_vert</Icon>
//       </IconButton>
//     </>
//   )}
//   {detailsOpen && (
//     <IconButton
//       color="inherit"
//       edge="end"
//       id="CloseDetailsBtn"
//       onClick={() => {
//         setIsEditing(false);
//         toggleDetails();
//       }}
//     >
//       <Icon>close</Icon>
//     </IconButton>
//   )}
//   <EventMenu
//     anchorEl={anchorEl}
//     setAnchorEl={setAnchorEl}
//     actions={[
//       {
//         label: detailsOpen
//           ? t('event.actions.hide_details')
//           : t('event.actions.show_details'),
//         onClick: toggleDetails,
//         id: 'DetailsTab',
//       },
//       !token && {
//         label: t('event.actions.add_to_my_events'),
//         onClick: addToMyEvents,
//         id: 'AddToMyEventsTab',
//       },
//       !!token && {
//         label: t('menu.dashboard'),
//         onClick: goToDashboard,
//         id: 'GoToDashboardTab',
//       },
//       !token && {
//         label: t('menu.login'),
//         onClick: signIn,
//         id: 'SignInTab',
//       },
//       !token && {
//         label: t('menu.register'),
//         onClick: signUp,
//         id: 'SignUpTab',
//       },
//       !!token && {
//         label: t('menu.profile'),
//         onClick: goProfile,
//         id: 'ProfileTab',
//       },
//       {
//         label: t('menu.about'),
//         onClick: goAbout,
//         id: 'AboutTab',
//       },
//     ].filter(Boolean)}
//   />
// </Toolbar>
// {detailsOpen && (
//   <Container className={classes.container} maxWidth="sm">
//     <EventDetails toggleDetails={toggleDetails} />
//   </Container>
// )}
// </AppBar>

// const useStyles = makeStyles(theme => ({
//   container: {
//     padding: theme.spacing(2),
//   },
//   appbar: ({detailsOpen}) => ({
//     overflow: 'hidden',
//     height: detailsOpen ? '100vh' : theme.mixins.toolbar.minHeight,
//     overflowY: detailsOpen ? 'scroll' : 'hidden',
//     transition: 'height 0.3s ease',
//     zIndex: theme.zIndex.appBar,
//     position: 'fixed',
//     top: 0,
//   }),
//   name: {
//     flexGrow: 1,
//     display: 'flex',
//     alignItems: 'center',
//   },
//   shareIcon: {
//     marginRight: theme.spacing(0),
//   },
// }));
