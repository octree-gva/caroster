import {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import PassengersList from '../PassengersList';
import AddPassengerButtons from '../AddPassengerButtons';
import HeaderEditing from './HeaderEditing';
import Header from './Header';
import useActions from './useActions';
import {Travel as TravelType} from '../../generated/graphql';

interface Props {
  travel: TravelType;
  toggleNewPassenger: () => void;
}

const Travel = (props: Props) => {
  const {travel} = props;
  const classes = useStyles();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const actions = useActions({travel});

  if (!travel) return null;

  return (
    <Paper className={classes.root}>
      {isEditing ? (
        <HeaderEditing travel={travel} toggleEditing={toggleEditing} />
      ) : (
        <Header travel={travel} toggleEditing={toggleEditing} />
      )}
      <Divider />
        <AddPassengerButtons toggleNewPassenger={props.toggleNewPassenger} />
      <Divider />
      {!isEditing && (
        <PassengersList
          passengers={travel.passengers}
          places={travel?.vehicle?.seats}
          addPassenger={actions.addPassenger}
          onClick={actions.removePassenger}
          icon="close"
        />
      )}
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
}));

export default Travel;
