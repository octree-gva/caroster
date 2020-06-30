import React, { useReducer } from "react";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useEvent } from "../../contexts/Event";
import { useToast } from "../../contexts/Toast";

const EventFab = () => {
  const { t } = useTranslation();
  const [open, toggleOpen] = useReducer((i) => !i, false);
  const classes = useStyles({ open });
  const { event } = useEvent();
  const { addToast } = useToast();

  const onShare = async () => {
    if (!event) return null;
    // If navigator as share capability
    if (!!navigator.share) {
      const shareData = {
        title: `Caroster ${event.name}`,
        url: `${window.location.href}`,
      };
      return await navigator.share(shareData);
    }
    // Else copy URL in clipboard
    else if (!!navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      addToast(t("event.actions.copied"));
      return true;
    }
  };

  return (
    <>
      <div className={classes.fabContainer}>
        <Fab color="primary" aria-label="more" onClick={toggleOpen}>
          <Icon>add</Icon>
        </Fab>
      </div>
      <div className={classes.actionContainer} onClick={toggleOpen}>
        <Fab
          color="primary"
          aria-label="share"
          variant="extended"
          className={classes.extendedFab}
          onClick={onShare}
        >
          <Icon className={classes.extendedIcon}>share</Icon>
          Partager
        </Fab>
        <Fab
          color="secondary"
          aria-label="add-car"
          variant="extended"
          className={classes.extendedFab}
        >
          <Icon className={classes.extendedIcon}>directions_car</Icon>
          Ajouter
        </Fab>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  fabContainer: ({ open }) => ({
    position: "fixed",
    bottom: open ? "-4rem" : theme.spacing(2),
    right: theme.spacing(2),
    transition: "all 0.3s ease",
    transform: open ? "rotate(45deg)" : "",
    zIndex: theme.zIndex.speedDial,
  }),
  actionContainer: ({ open }) => ({
    position: "fixed",
    bottom: open ? 0 : "-100vh",
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    transition: "all 0.3s ease",
    height: "100vh",
  }),
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
  extendedFab: {
    width: "11rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default EventFab;
