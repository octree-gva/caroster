import {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {Travel as TravelType} from '../../generated/graphql';
import ClearButton from '../ClearButton';
import PassengersList from '../PassengersList';
import AddPassengerButtons from '../AddPassengerButtons';
import HeaderEditing from './HeaderEditing';
import Header from './Header';
import useActions from './useActions';

interface Props {
  travel: TravelType;
  getAddPassengerFunction: (addSelf: boolean) => () => void;
  canAddSelf: boolean;
}

const Travel = (props: Props) => {
  const {travel} = props;
  const classes = useStyles();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const actions = useActions({travel});

  if (!travel) return null;
  const disableNewPassengers =
    travel.passengers.length >= travel.vehicle?.seats;

  return (
    <Paper className={classes.root}>
      {isEditing ? (
        <HeaderEditing travel={travel} toggleEditing={toggleEditing} />
      ) : (
        <Header travel={travel} toggleEditing={toggleEditing} />
      )}
      <Divider />
      <AddPassengerButtons
        getOnClickFunction={props.getAddPassengerFunction}
        canAddSelf={props.canAddSelf}
        variant="travel"
        disabled={disableNewPassengers}
      />
      <Divider />
      {!isEditing && (
        <PassengersList
          passengers={travel.passengers}
          places={travel?.vehicle?.seats}
          onClick={actions.sendPassengerToWaitingList}
          isVehicle
          Button={({onClick}: {onClick: () => void}) => (
            <ClearButton icon="close" onClick={onClick} tabIndex={-1} />
          )}
          isTravel
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
