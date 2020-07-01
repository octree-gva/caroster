import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "../../components/TextField";
import moment from "moment";
import { useEvent } from "../../contexts/Event";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { DatePicker } from "@material-ui/pickers";
import Map from "../../components/Map";

const EventDetails = ({ toggleDetails }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { event, isEditing, setEditingEvent, editingEvent } = useEvent();

  if (!event) return null;
  const idPrefix = isEditing ? "EditEvent" : "Event";
  return (
    <div>
      <div className={classes.section}>
        <Typography variant="h6">{t("event.fields.starts_on")}</Typography>
        {isEditing ? (
          <DatePicker
            value={
              editingEvent.date ? moment(editingEvent.date) : moment(event.date)
            }
            onChange={(date) =>
              setEditingEvent({ ...editingEvent, date: date.toISOString() })
            }
            className={classes.textField}
            fullWidth
            format="DD.MM.YYYY"
            disablePast
            id={`${idPrefix}Date`}
            name="date"
            TextFieldComponent={(p) => <TextField light {...p} />}
          />
        ) : (
          <Typography variant="body1" id={`${idPrefix}Date`}>
            {event.date}
          </Typography>
        )}
      </div>
      <div className={classes.section}>
        <Typography variant="h6">{t("event.fields.address")}</Typography>
        {isEditing ? (
          <TextField
            light
            multiline
            rows={4}
            value={editingEvent.address ?? event.address}
            onChange={(e) =>
              setEditingEvent({ ...editingEvent, address: e.target.value })
            }
            id={`${idPrefix}Address`}
            name="address"
          />
        ) : (
          <Typography variant="body1" id={`${idPrefix}Address`}>
            {event.address}
          </Typography>
        )}
      </div>
      <div className={classes.actions}>
        <Button onClick={toggleDetails} variant="contained" id={`CarFindBtn`}>
          {t("event.actions.find_car")}
        </Button>
      </div>
      {event.position && (
        <div className={classes.map} id={`${idPrefix}AddressMap`}>
          <Map position={event.position} />
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  map: {
    marginTop: theme.spacing(4),
  },
}));

export default EventDetails;
