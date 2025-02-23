import {useState} from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import {debounce} from '@mui/material/utils';
import {useTranslation} from 'next-i18next';
import useLocale from '../../hooks/useLocale';
import getPlacesSuggestions from '../../lib/getPlacesSuggestion';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

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
  disabled?: boolean;
}

const MAPBOX_CONFIGURED = process.env['MAPBOX_CONFIGURED'] || false;

const PlaceInput = ({
  place = '',
  latitude,
  longitude,
  onSelect,
  label,
  textFieldProps,
  disabled,
}: Props) => {
  const {t} = useTranslation();
  const {locale} = useLocale();
  const [mapboxAvailable, setMapboxAvailable] = useState(MAPBOX_CONFIGURED);
  const [noCoordinates, setNoCoordinates] = useState(!latitude || !longitude);
  const [options, setOptions] = useState([] as Array<any>);
  const previousOption = place ? {place_name: place, previous: true} : null;

  const onChange = async (_event, selectedOption) => {
    if (selectedOption?.center) {
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
        place: selectedOption?.place_name || '',
        latitude: null,
        longitude: null,
      });
    }
  };

  const updateOptions = debounce(async (_event, search: string) => {
    if (search)
      getPlacesSuggestions({search, locale, proximity: 'ip'}).then(
        suggestions => {
          let defaultOptions = [];
          if (previousOption) defaultOptions = [previousOption];
          if (search && search !== previousOption?.place_name)
            defaultOptions = [...defaultOptions, {place_name: search}];

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
    else
      onSelect({
        place: null,
        latitude: null,
        longitude: null,
      });
  }, 400);

  const getHelperText = () => {
    if (!place) return undefined;
    else if (!mapboxAvailable) return t`placeInput.mapboxUnavailable`;
    else if (noCoordinates) return t`placeInput.noCoordinates`;
  };

  return (
    <Autocomplete
      freeSolo
      autoComplete
      getOptionLabel={option => option?.place_name || ''}
      options={options}
      defaultValue={previousOption}
      filterOptions={x => x}
      noOptionsText={t('autocomplete.noMatch')}
      onChange={onChange}
      onInputChange={updateOptions}
      disabled={disabled}
      size="small"
      renderInput={params => (
        <TextField
          label={label}
          multiline
          maxRows={4}
          helperText={MAPBOX_CONFIGURED && getHelperText()}
          {...textFieldProps}
          slotProps={{
            formHelperText: {
              sx: {color: 'warning.main'},
            },
            input: {
              style: {paddingRight: 0},
              ...params.InputProps,
              ...(textFieldProps?.slotProps?.input || {
                paddingRight: 0,
                endAdornment: (
                  <InputAdornment position="end">
                    <PlaceOutlinedIcon />
                  </InputAdornment>
                ),
              }),
            },
          }}
          {...params}
        />
      )}
      renderOption={({key, ...props}, option) => {
        if (option.previous) return null;

        return (
          <ListItem key={key || option.id || 'text'} {...props}>
            <ListItemText
              primary={option?.place_name || ''}
              secondary={!option.center && t`placeInput.item.noCoordinates`}
              secondaryTypographyProps={{
                color: option.center ? 'inherit' : 'warning.main',
              }}
            />
          </ListItem>
        );
      }}
    />
  );
};

export default PlaceInput;
