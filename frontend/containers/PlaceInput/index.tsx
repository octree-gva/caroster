import {useState} from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import {debounce} from '@mui/material/utils';
import {useTranslation} from 'react-i18next';
import useLocale from '../../hooks/useLocale';
import getPlacesSuggestions from '../../lib/getPlacesSuggestion';

interface Props {
  place: string;
  latitude?: number;
  longitude?: number;
  onSelect: ({
    latitude,
    longitude,
    place,
  }: {
    latitude?: number;
    longitude?: number;
    place: string;
  }) => void;
  label?: string;
  textFieldProps?: TextFieldProps;
}

const MAPBOX_CONFIGURED = process.env['MAPBOX_CONFIGURED'] || false;

const PlaceInput = ({
  place = '',
  latitude,
  longitude,
  onSelect,
  label,
  textFieldProps,
}: Props) => {
  const {t} = useTranslation();
  const {locale} = useLocale();
  const [mapboxAvailable, setMapboxAvailable] = useState(MAPBOX_CONFIGURED);
  const [noCoordinates, setNoCoordinates] = useState(!latitude || !longitude);
  const previousOption = place ? {place_name: place, previous: true} : null;

  const [options, setOptions] = useState([] as Array<any>);
  const onChange = async (e, selectedOption) => {
    if (selectedOption.previous) {
      setNoCoordinates(!latitude || !longitude);
      onSelect({
        place,
        latitude,
        longitude,
      });
    } else if (selectedOption.center) {
      const [optionLongitude, optionLatitude] = selectedOption.center;
      setNoCoordinates(false);
      onSelect({
        place: selectedOption.place_name,
        latitude: optionLatitude,
        longitude: optionLongitude,
      });
    } else {
      setNoCoordinates(true);
      onSelect({
        place: selectedOption.place_name,
        latitude: null,
        longitude: null,
      });
    }
  };

  const updateOptions = debounce(async (e, search: string) => {
    if (search !== '') {
      getPlacesSuggestions({search, proximity: 'ip', locale}).then(
        suggestions => {
          let defaultOptions = [];
          if (previousOption) {
            defaultOptions = [previousOption];
          }
          if (search && search !== previousOption?.place_name) {
            defaultOptions = [...defaultOptions, {place_name: search}];
          }
          if (suggestions?.length >= 1) {
            setMapboxAvailable(true);
            const suggestionsWithoutCopies = suggestions.filter(
              ({place_name}) =>
                place_name !== search &&
                place_name !== previousOption?.place_name
            );
            const uniqueOptions = [
              ...defaultOptions,
              ...suggestionsWithoutCopies,
            ];
            setOptions(uniqueOptions);
          } else {
            setMapboxAvailable(false);
            setOptions(defaultOptions);
          }
        }
      );
    }
  }, 400);

  const getHelperText = () => {
    if (!mapboxAvailable) {
      return t`placeInput.mapboxUnavailable`;
    }
    if (noCoordinates) {
      return t`placeInput.noCoordinates`;
    }
    return null;
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      getOptionLabel={option => option.place_name}
      options={options}
      autoComplete
      defaultValue={previousOption}
      filterOptions={x => x}
      noOptionsText={t('autocomplete.noMatch')}
      onChange={onChange}
      onInputChange={updateOptions}
      renderInput={params => (
        <TextField
          label={label}
          multiline
          maxRows={4}
          helperText={MAPBOX_CONFIGURED && getHelperText()}
          FormHelperTextProps={{sx: {color: 'warning.main'}}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{mr: -0.5}}>
                <PlaceOutlinedIcon />
              </InputAdornment>
            ),
          }}
          {...params}
          {...textFieldProps}
        />
      )}
      renderOption={(props, option) => {
        return <li {...props}>{option.place_name}</li>;
      }}
    />
  );
};

export default PlaceInput;
