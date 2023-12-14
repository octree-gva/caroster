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
  onSelect: ({
    location,
    place,
  }: {
    location: [number, number];
    place: string;
  }) => void;
  label?: string;
  textFieldProps?: TextFieldProps;
}

const PlaceInput = ({
  place = '',
  onSelect,
  label,
  textFieldProps,
}: Props) => {
  const {t} = useTranslation();
  const {locale} = useLocale();

  const [options, setOptions] = useState([] as Array<any>);

  const onChange = async (e, selectedOption) => {
    onSelect({
      place: selectedOption.place_name,
      location: selectedOption.center,
    });
  };

  const updateOptions = debounce(async (e, search: string) => {
    if (search !== '') {
      getPlacesSuggestions({search, proximity: 'ip', locale}).then(suggestions => {
        setOptions(suggestions);
      });
    }
  }, 400);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      getOptionLabel={option => option.place_name}
      options={options}
      autoComplete
      defaultValue={{place_name: place}}
      filterOptions={x => x}
      noOptionsText={t('autocomplete.noMatch')}
      onChange={onChange}
      onInputChange={updateOptions}
      renderInput={params => (
        <TextField
          label={label}
          multiline
          maxRows={4}
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
