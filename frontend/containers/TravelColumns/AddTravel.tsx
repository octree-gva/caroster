import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';

interface Props {
  toggle: () => void;
}

const AddTravel = (props: Props) => {
  const {toggle} = props;
  const classes = useStyles();
  const {t} = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  let containerClasses = [classes.container]
  if (matches) {
    containerClasses = [...containerClasses, 'tour_travel_add']
  }
  return (
    <Container
      maxWidth="sm"
      className={clsx(containerClasses)}
    >
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
