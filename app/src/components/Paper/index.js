import React from "react";
import PaperMUI from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const Paper = ({ className, ...props }) => {
  const classes = useStyles();
  return (
    <PaperMUI classes={{ root: classes.root, parent: className }} {...props} />
  );
};

export default Paper;
