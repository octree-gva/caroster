import {useState} from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import {debounce} from '@mui/material/utils';
import {SessionToken, AddressAutofillSuggestion} from '@mapbox/search-js-core';
import {useTranslation} from 'react-i18next';
import useLocale from '../../hooks/useLocale';

interface Props {
  address: string;
  onSelect: ({
    location,
    address,
  }: {
    location: [number, number];
    address: string;
  }) => void;
  label: string;
  textFieldProps?: TextFieldProps;
}

const AddressAutofill = ({
  address = '',
  onSelect,
  label,
  textFieldProps,
}: Props) => {
  const {t} = useTranslation();
  const {locale} = useLocale();
  const [value, setValue] = useState(address);
  const sessionToken = new SessionToken();

  const [options, setOptions] = useState(
    [] as Array<AddressAutofillSuggestion>
  );

  const onChange = async (e, selectedOption) => {
    const body = await fetch(
      '/api/mapbox/autofill/retrieve?' +
        new URLSearchParams({
          sessionToken,
          locale,
        }),
      {body: JSON.stringify(selectedOption), method: 'POST'}
    ).then(response => response.json());
    setValue(selectedOption);
    onSelect({
      address: selectedOption.full_address,
      location: body.features[0]?.geometry?.coordinates,
    });
  };

  const updateOptions = debounce(async (e, search: string) => {
    if (search !== '') {
      await fetch(
        '/api/mapbox/autofill/suggest?' +
          new URLSearchParams({
            search,
            sessionToken,
            locale,
          })
      )
        .then(response => response.json())
        .then(body => {
          setOptions(body.suggestions);
        });
    }
  }, 400);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      getOptionLabel={option =>
        option.full_address || option.place_name || address
      }
      options={options}
      autoComplete
      value={value}
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
            type: 'search',
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
        return <li {...props}>{option.full_address || option.place_name}</li>;
      }}
    />
  );
};

export default AddressAutofill;
