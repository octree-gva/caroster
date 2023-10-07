import {useMemo, useReducer} from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { useTheme } from '@mui/styles';
import {useTranslation} from 'react-i18next';
import HeaderEditing from './HeaderEditing';
import Header from './Header';
import useActions from './useActions';
import PassengersList from '../PassengersList';
import AddPassengerButtons from '../AddPassengerButtons';
import useProfile from '../../hooks/useProfile';
import useMapStore from '../../stores/useMapStore';
import {Travel as TravelType} from '../../generated/graphql';

interface Props {
  travel: TravelType & {id: string};
  getAddPassengerFunction: (addSelf: boolean) => () => void;
}

const Travel = (props: Props) => {
  const {travel} = props;

  const {t} = useTranslation();
  const theme = useTheme();
  const [isEditing, toggleEditing] = useReducer(i => !i, false);
  const actions = useActions({travel});
  const {userId, connected} = useProfile();
  const {focusedTravel} = useMapStore();
  const focused = focusedTravel === travel.id;

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
    <Paper
      sx={{
        position: 'relative',
        boxShadow: focused ? `0px 0px 5px 2px ${theme.palette.primary.main}` : 'none',
      }}
      id={travel.id}
    >
      {isEditing ? (
        <HeaderEditing travel={travel} toggleEditing={toggleEditing} />
      ) : (
        <Header travel={travel} toggleEditing={toggleEditing} />
      )}
      {!isEditing && (
        <>
          <Divider />
          <AddPassengerButtons
            getOnClickFunction={props.getAddPassengerFunction}
            canAddSelf={canAddSelf}
            variant="travel"
            disabled={disableNewPassengers}
          />
          <Divider />
          <PassengersList
            passengers={travel.passengers.data}
            onClick={actions.sendPassengerToWaitingList}
            isTravel
            Button={({onClick}: {onClick: () => void}) => (
              <ListItemSecondaryAction>
                <Button
                  size="small"
                  color="primary"
                  onClick={onClick}
                  tabIndex={-1}
                >
                  {t`travel.passengers.remove`}
                </Button>
              </ListItemSecondaryAction>
            )}
          />
        </>
      )}
    </Paper>
  );
};

export default Travel;
