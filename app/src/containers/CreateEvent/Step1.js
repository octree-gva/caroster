import React, { useState, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { useTranslation } from "react-i18next";
import useDebounce from "../../hooks/useDebounce";
import Paper from "../../components/Paper";
import TosDialog from "../TosDialog";

const isValidEmail = (email) =>
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const Step1 = ({ nextStep, event, addToEvent, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // States
  const [name, setName] = useState(event.name ?? "");
  const [email, setEmail] = useState(event.email ?? "");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [tos, setTos] = useState(false);
  const [showTos, toggleTos] = useReducer((i) => !i, false);

  const debouncedEmail = useDebounce(email, 400);
  useEffect(() => {
    setEmailIsValid(isValidEmail(debouncedEmail));
  }, [debouncedEmail]);

  const onNext = () => {
    addToEvent({ name, email });
    nextStep();
  };

  return (
    <>
      <Paper {...props}>
        <TextField
          className={classes.textField}
          label={t("event.creation.event_name")}
          fullWidth
          autoFocus
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="NewEventName"
          name="name"
        />
        <TextField
          className={classes.textField}
          label={t("event.creation.creator_email")}
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="NewEventEmail"
          name="email"
          type="email"
        />
        <div className={classes.tos}>
          <Checkbox
            name="tos"
            id="NewEventTos"
            checked={tos}
            onChange={(e) => setTos(e.target.checked)}
          />
          <Typography variant="caption" onClick={toggleTos}>
            {t("event.creation.tos")}
          </Typography>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onNext}
          disabled={!name || !email || !emailIsValid || !tos}
        >
          {t("event.creation.next")}
        </Button>
      </Paper>
      <TosDialog open={showTos} toggle={toggleTos} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {},
  button: {
    marginTop: theme.spacing(2),
  },
  tos: {
    cursor: "pointer",
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    marginLeft: "-11px",
  },
}));

export default Step1;
