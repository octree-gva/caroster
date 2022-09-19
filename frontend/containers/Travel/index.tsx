import {useMemo, useReducer} from 'react';
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
import useProfile from '../../hooks/useProfile';

interface Props {
  travel: TravelType & {id: string};
  getAddPassengerFunction: (addSelf: boolean) => () => void;
}

const Travel = (props: Props) => {
  const {travel} = props;
  const classes = useStyles();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const actions = useActions({travel});
  const {userId, connected} = useProfile();

  if (!travel) return null;
  const disableNewPassengers = travel.passengers.data?.length >= travel.seats;

  const canAddSelf = useMemo(() => {
    if (!connected) return false;
    const isInTravel = travel.passengers?.data.some(
      passenger => passenger.attributes.user?.data?.id === `${userId}`
    );

    return !isInTravel;
  }, [travel, userId]);

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
        canAddSelf={canAddSelf}
        variant="travel"
        disabled={disableNewPassengers}
      />
      <Divider />
      {!isEditing && (
        <PassengersList
          passengers={travel.passengers.data}
          places={travel?.seats}
          onClick={actions.sendPassengerToWaitingList}
          isTravel
          Button={({onClick}: {onClick: () => void}) => (
            <ClearButton icon="close" onClick={onClick} tabIndex={-1} />
          )}
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
