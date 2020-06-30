import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Paper from "../../components/Paper";

const Car = ({ car }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  if (!car) return null;

  return (
    <Paper>
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
          <Typography variant="subtitle2">{t("car.fields.details")}</Typography>
          <Typography variant="body2">{car.details}</Typography>
        </div>
      )}
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
  },
}));

export default Car;
