import {useState} from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import {debounce} from '@mui/material/utils';
import {SessionToken} from '@mapbox/search-js-core';
import {useTranslation} from 'react-i18next';
import useLocale from '../../hooks/useLocale';
import {MapboxSuggestion} from '../../pages/api/mapbox/searchbox/suggest';
import {GeocodedOption} from '../../pages/api/mapbox/searchbox/retrieve';

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

type Option = MapboxSuggestion | {name: String; previous?: Boolean};

const MAPBOX_CONFIGURED = process.env['MAPBOX_CONFIGURED'] || false;

const PlaceInput = ({
  latitude,
  longitude,
  place = '',
  onSelect,
  label,
  textFieldProps,
  disabled,
}: Props) => {
  const {t} = useTranslation();
  const {locale} = useLocale();
  const [mapboxAvailable, setMapboxAvailable] = useState(MAPBOX_CONFIGURED);
  const [noCoordinates, setNoCoordinates] = useState(!latitude || !longitude);
  const previousOption = place ? {name: place, previous: true} : null;
  const sessionToken = new SessionToken();

  const [options, setOptions] = useState([] as Array<Option>);

  const getOptionDecorators = option => {
    if (option.mapbox_id) {
      return {secondary: option.address || option.place_formatted};
    } else {
      return {
        secondary: t`placeInput.item.noCoordinates`,
        color: 'warning.main',
      };
    }
  };

  const onChange = async (e, selectedOption) => {
    if (selectedOption.mapbox_id) {
      const geocodedFeature: GeocodedOption = await fetch(
        '/api/mapbox/searchbox/retrieve?' +
          new URLSearchParams({
            id: selectedOption.mapbox_id,
            sessionToken: String(sessionToken),
            locale,
          })
      ).then(response => response.json());
      const {longitude, latitude} = geocodedFeature.coordinates;
      setNoCoordinates(false);
      onSelect({
        place: geocodedFeature.name,
        latitude,
        longitude,
      });
    } else {
      setNoCoordinates(true);
      onSelect({
        place: selectedOption.name,
        latitude: null,
        longitude: null,
      });
    }
  };

  const updateOptions = debounce(async (e, search: string) => {
    if (search !== '') {
      try {
        await fetch(
          '/api/mapbox/searchbox/suggest?' +
            new URLSearchParams({
              search,
              sessionToken,
              locale,
            })
        )
          .then(response => response.json())
          .then(suggestions => setOptions([{name: search}, ...suggestions]));
      } catch (err) {
        console.warn(err);
        setMapboxAvailable(false);
      }
    }
  }, 400);

  const getHelperText = () => {
    if (!mapboxAvailable) return t`placeInput.mapboxUnavailable`;
    else if (noCoordinates) return t`placeInput.noCoordinates`;
  };

  const handleBlur = e => {
    onSelect({
      place: e.target.value,
      latitude,
      longitude,
    });
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      getOptionLabel={option => option?.name || place}
      options={options}
      defaultValue={previousOption}
      autoComplete
      filterOptions={x => x}
      noOptionsText={t('autocomplete.noMatch')}
      onChange={onChange}
      onInputChange={updateOptions}
      disabled={disabled}
      renderInput={params => (
        <TextField
          label={label}
          multiline
          maxRows={4}
          helperText={MAPBOX_CONFIGURED && getHelperText()}
          FormHelperTextProps={{sx: {color: 'warning.main'}}}
          InputProps={{
            type: 'search',
            endAdornment: (
              <InputAdornment position="end" sx={{mr: -0.5}}>
                <PlaceOutlinedIcon />
              </InputAdornment>
            ),
          }}
          {...params}
          {...textFieldProps}
          onBlur={handleBlur}
        />
      )}
      renderOption={(props, option) => {
        const {color, secondary} = getOptionDecorators(option);
        if (option.previous) return null;
        return (
          <ListItem key={option.mapbox_id || 'text'} {...props}>
            <ListItemText
              primary={option.name}
              secondary={secondary}
              secondaryTypographyProps={{color}}
            />
          </ListItem>
        );
      }}
    />
  );
};

export default PlaceInput;
