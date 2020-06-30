import React, { useState, useReducer, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppBar from "@material-ui/core/AppBar";
import TextField from "../components/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layouts/Default";
import EventMenu from "../containers/EventMenu";
import EventDetails from "../containers/EventDetails";
import { useEvent, EventProvider } from "../contexts/Event";
import CarColumns from "../containers/CarColumns";
import { useToast } from "../contexts/Toast";

const Event = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailsOpen, toggleDetails] = useReducer((i) => !i, false);
  const classes = useStyles({ detailsOpen });
  const {
    event,
    isEditing,
    setIsEditing,
    editingEvent,
    setEditingEvent,
    updateEvent,
  } = useEvent();

  useEffect(() => {
    if (!detailsOpen) setIsEditing(false);
  }, [detailsOpen]);

  const onEventSave = async (e) => {
    try {
      await updateEvent();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      addToast(t("event.errors.cant_update"));
    }
  };

  if (!event) return <div>{t("generic.loading")}</div>;

  return (
    <Layout>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          {isEditing ? (
            <TextField
              light
              value={editingEvent.name ?? event.name}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, name: e.target.value })
              }
              id="NewEventName"
              name="name"
            />
          ) : (
            <Typography variant="h6" className={classes.name}>
              {event.name}
            </Typography>
          )}
          {!detailsOpen && (
            <IconButton
              edge="end"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Icon className={classes.barIcon}>more_vert</Icon>
            </IconButton>
          )}
          {detailsOpen && !isEditing && (
            <IconButton edge="end" onClick={(e) => setIsEditing(true)}>
              <Icon className={classes.barIcon}>edit</Icon>
            </IconButton>
          )}
          {detailsOpen && isEditing && (
            <IconButton edge="end" onClick={onEventSave}>
              <Icon className={classes.barIcon}>done</Icon>
            </IconButton>
          )}
          <EventMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            actions={[
              {
                label: detailsOpen
                  ? t("event.actions.hide_details")
                  : t("event.actions.show_details"),
                onClick: toggleDetails,
              },
              { label: t("event.actions.add_car"), onClick: () => {} },
              { label: t("event.actions.invite"), onClick: () => {} },
            ]}
          />
        </Toolbar>
        <Container className={classes.container} maxWidth="sm">
          <EventDetails toggleDetails={toggleDetails} />
        </Container>
      </AppBar>
      <CarColumns cars={event.cars} />
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  container: { padding: theme.spacing(2) },
  appbar: ({ detailsOpen }) => ({
    transition: "height 0.3s ease",
    overflow: "hidden",
    height: detailsOpen ? "100vh" : theme.mixins.toolbar.minHeight,
  }),
  name: {
    flexGrow: 1,
  },
  barIcon: {
    color: "white",
  },
}));

export default (props) => (
  <EventProvider {...props}>
    <Event {...props} />
  </EventProvider>
);
