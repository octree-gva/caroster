import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useToast } from "../../contexts/Toast";

const Step2 = ({ event, addToEvent, createEvent }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { addToast } = useToast();

  // States
  const [date, setDate] = useState(!!event.date ? moment(event.date) : null);
  const [address, setAddress] = useState(event.address ?? "");

  const onCreate = async () => {
    const eventData = { date: date?.toISOString(), address };
    addToEvent(eventData);
    const result = await createEvent(eventData);
    if (!result) addToast(t("event.errors.cant_create"));
    else history.push(`/e/${result.id}`);
  };

  return (
    <Paper className={classes.container}>
      <DatePicker
        label={t("event.creation.date")}
        value={date}
        onChange={setDate}
        className={classes.textField}
        fullWidth
        format="DD.MM.YYYY"
        disablePast
      />
      <TextField
        className={classes.textField}
        label={t("event.creation.address")}
        fullWidth
        margin="dense"
        multiline
        rows={4}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        fullWidth
        onClick={onCreate}
      >
        {t("event.creation.create")}
      </Button>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  textField: {},
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default Step2;
