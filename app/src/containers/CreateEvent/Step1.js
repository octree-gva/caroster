import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import useDebounce from "../../hooks/useDebounce";

const isValidEmail = (email) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const Step1 = ({ nextStep, event, addToEvent }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // States
  const [name, setName] = useState(event.name ?? "");
  const [email, setEmail] = useState(event.email ?? "");
  const [emailIsValid, setEmailIsValid] = useState(false);

  useEffect(() => {
    setEmailIsValid(isValidEmail(email));
  }, [useDebounce(email, 400)]);

  const onNext = () => {
    addToEvent({ name, email });
    nextStep();
  };

  return (
    <Paper className={classes.container}>
      <TextField
        className={classes.textField}
        label={t("event.creation.event_name")}
        fullWidth
        autoFocus
        margin="dense"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label={t("event.creation.creator_email")}
        fullWidth
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        fullWidth
        onClick={onNext}
        disabled={!name || !email || !emailIsValid}
      >
        {t("event.creation.next")}
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

export default Step1;
