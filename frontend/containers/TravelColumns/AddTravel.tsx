import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

interface Props {
  toggle: () => void;
}

const AddTravel = (props: Props) => {
  const {toggle} = props;
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Button
        classes={{containedSecondary: classes.button}}
        fullWidth
        variant="contained"
        color="primary"
        onClick={toggle}
      >
        {t('travel.creation.title')}
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

export default AddTravel;
