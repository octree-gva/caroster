import {Icon, InputAdornment} from '@mui/material';
import {useTranslation} from 'react-i18next';
import PlaceInput from '../PlaceInput';
import useTravelsStore from '../../stores/useTravelsStore';

type Props = {};

const SearchField = (props: Props) => {
  const {t} = useTranslation();
  const meetingFilter = useTravelsStore(s => s.meetingFilter);
  const setMeetingFilter = useTravelsStore(s => s.setMeetingFilter);

  const onSelect = (location: {
    latitude?: number;
    longitude?: number;
    place: string;
  }) => {
    setMeetingFilter(location);
  };

  return (
    <PlaceInput
      place={meetingFilter.place}
      onSelect={onSelect}
      textFieldProps={{
        variant: 'outlined',
        placeholder: t`travel.fields.meeting_point`,
        size: 'small',
        slotProps: {
          input: {
            size: 'small',
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          },
        },
      }}
    />
  );
};

export default SearchField;
