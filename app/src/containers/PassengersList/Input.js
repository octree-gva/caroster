import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const Input = ({ addPassenger }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const { t } = useTranslation();

  const onSave = () => {
    if (!!name) {
      addPassenger(name);
      setName("");
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) onSave();
  };

  return (
    <>
      <div className={classes.container}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={onKeyDown}
          fullWidth
          label={t("car.passengers.add")}
          id="NewPassenger"
          name="passenger"
        />
      </div>
      <Divider />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: { padding: theme.spacing(0, 2, 2) },
}));

export default Input;
