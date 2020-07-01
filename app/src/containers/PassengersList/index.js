import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Passenger from "./Passenger";
import Input from "./Input";

const PassengersList = ({
  passengers,
  places = 0,
  addPassenger,
  removePassenger,
}) => {
  const classes = useStyles();

  const emptyList = Array.apply(null, Array(places));
  const list = Array.isArray(passengers)
    ? emptyList.map((u, index) => passengers[index])
    : emptyList;
  const emptyPlaces = !!passengers ? places - passengers.length : places;

  return (
    <div className={classes.container}>
      {emptyPlaces > 0 && <Input addPassenger={addPassenger} />}
      {!!places &&
        list.map((passenger, index) => (
          <Passenger
            key={index}
            passenger={passenger}
            removePassenger={removePassenger}
          />
        ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: { padding: theme.spacing(1, 0) },
}));

export default PassengersList;
