import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

interface Props {
  toggleNewCar: () => void;
}

const AddCar = (props: Props) => {
  const {toggleNewCar} = props;
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Button
        className="tour_car_add1"
        classes={{containedSecondary: classes.button}}
        fullWidth
        variant="contained"
        color="secondary"
        onClick={toggleNewCar}
      >
        {t('car.creation.title')}
      </Button>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '&:hover': {color: theme.palette.secondary.contrastText},
  },
}));

export default AddCar;
