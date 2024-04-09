import {useState} from 'react';
import useEventStore from '../../stores/useEventStore';
import {TravelEntity} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';
import moment, {Moment} from 'moment';

const useDisplayTravels = () => {
  const [selectedDates, setSelectedDates] = useState<Moment[]>([]);
  const {userId} = useProfile();
  const event = useEventStore(s => s.event);
  const travels = event?.travels?.data || [];

  const sortTravels = (
    {attributes: a}: TravelEntity,
    {attributes: b}: TravelEntity
  ) => {
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

  const sortedTravels = travels?.slice().sort(sortTravels);

  const filteredTravels = sortedTravels.filter(travel => {
    const departureDate = travel?.attributes?.departureDate
      ? moment(travel.attributes.departureDate)
      : null;
    return selectedDates.some(date => date.isSame(departureDate));
  });

  const displayedTravels =
    selectedDates.length > 0 ? filteredTravels : sortedTravels;

  return {selectedDates, setSelectedDates, displayedTravels};
};

export default useDisplayTravels;
