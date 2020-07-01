import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { useStrapi } from "strapi-react-context";
import moment from "moment";
import PassengersList from "../PassengersList";
import { useToast } from "../../contexts/Toast";

const Car = ({ car }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const strapi = useStrapi();

  if (!car) return null;

  const addPassenger = async (passenger) => {
    try {
      await strapi.services.cars.update(car.id, {
        passengers: [...(car.passengers || []), passenger],
      });
    } catch (error) {
      console.error(error);
      addToast(t("car.errors.cant_add_passenger"));
    }
  };

  const removePassenger = async (passenger) => {
    if (!car?.passengers) return false;
    try {
      return await strapi.services.cars.update(car.id, {
        passengers: car.passengers.filter((pssngr) => passenger !== pssngr),
      });
    } catch (error) {
      console.error(error);
      addToast(t("car.errors.cant_remove_passenger"));
      return false;
    }
  };

  return (
    <Paper>
      <div className={classes.header}>
        {!!car.departure && (
          <Typography variant="overline">
            {moment(car.departure).format("LLLL")}
          </Typography>
        )}
        <Typography variant="h5">{car.name}</Typography>
        {!!car.meeting && (
          <div className={classes.section}>
            <Typography variant="subtitle2">
              {t("car.fields.meeting_point")}
            </Typography>
            <Typography variant="body2">{car.meeting}</Typography>
          </div>
        )}
        {!!car.details && (
          <div className={classes.section}>
            <Typography variant="subtitle2">
              {t("car.fields.details")}
            </Typography>
            <Typography variant="body2">{car.details}</Typography>
          </div>
        )}
      </div>
      <Divider />
      <PassengersList
        passengers={car.passengers}
        places={car.seats}
        addPassenger={addPassenger}
        removePassenger={removePassenger}
      />
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  header: { padding: theme.spacing(2) },
  section: {
    marginTop: theme.spacing(2),
  },
}));

export default Car;
