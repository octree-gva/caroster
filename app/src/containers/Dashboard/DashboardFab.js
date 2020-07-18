import React from 'react';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core/styles';

export const DashboardFab = ({onClick, open}) => {
  const classes = useStyles({open});

  return (
    <div className={classes.container}>
      <Fab color="secondary" aria-label="dashboard-add" onClick={onClick}>
        <Icon>add</Icon>
      </Fab>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: ({open}) => ({
    position: 'fixed',
    bottom: open ? -theme.spacing(8) : theme.spacing(3),
    right: theme.spacing(3),
    transition: 'all 0.3s ease',
    transform: open ? 'rotate(45deg)' : '',
    zIndex: theme.zIndex.speedDial,
  }),
}));
