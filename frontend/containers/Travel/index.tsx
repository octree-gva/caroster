import {useMemo, useReducer} from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import {Travel as TravelType} from '../../generated/graphql';
import ClearButton from '../ClearButton';
import PassengersList from '../PassengersList';
import AddPassengerButtons from '../AddPassengerButtons';
import HeaderEditing from './HeaderEditing';
import Header from './Header';
import useActions from './useActions';
import useProfile from '../../hooks/useProfile';

const PREFIX = 'Travel';

const classes = {
  root: `${PREFIX}-root`
};

const StyledPaper = styled(Paper)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    position: 'relative',
  }
}));

interface Props {
  travel: TravelType & {id: string};
  getAddPassengerFunction: (addSelf: boolean) => () => void;
}

const Travel = (props: Props) => {
  const {travel} = props;

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
    <StyledPaper className={classes.root}>
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
    </StyledPaper>
  );
};

export default Travel;
