import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const AddCar = ({ toggleNewCar }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Button variant="contained" onClick={toggleNewCar}>
        {t("car.creation.title")}
      </Button>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default AddCar;
