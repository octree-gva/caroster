import useEventStore from '../../stores/useEventStore';
import {TravelEntity} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';
import moment from 'moment';
import useTravelsStore from '../../stores/useTravelsStore';
import {useMemo} from 'react';

const useDisplayTravels = () => {
  const datesFilter = useTravelsStore(s => s.datesFilter);
  const {userId} = useProfile();
  const event = useEventStore(s => s.event);

  const dateFileredTravels = useMemo(() => {
    const travels = event?.travels?.data || [];
    return travels
      .slice()
      .sort(sortTravels(userId))
      .filter(travel => {
        if (datesFilter.length === 0) return true;
        const departureDate = travel?.attributes?.departureDate
          ? moment(travel.attributes.departureDate)
          : null;
        return datesFilter.some(date => date.isSame(departureDate));
      });
  }, [event?.travels?.data, datesFilter, userId]);

  return {displayedTravels: dateFileredTravels};
};

const sortTravels =
  userId =>
  ({attributes: a}: TravelEntity, {attributes: b}: TravelEntity) => {
    if (a?.user?.data?.id === userId && b?.user?.data?.id !== userId) return -1;
    else if (a?.user?.data?.id !== userId && b?.user?.data?.id == userId)
      return 1;

    const passengerFirst =
      Number(
        b?.passengers?.data?.some(
          passenger => passenger.attributes.user?.data?.id === userId
        )
      ) -
      Number(
        a?.passengers?.data?.some(
          passenger => passenger.attributes.user?.data?.id === userId
        )
      );
    if (passengerFirst !== 0) return passengerFirst;
    const dateA = new Date(a.departureDate).getTime();
    const dateB = new Date(b.departureDate).getTime();
    if (dateA === dateB)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    else return dateA - dateB;
  };

export default useDisplayTravels;
