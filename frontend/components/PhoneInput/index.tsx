import React, {useState} from 'react';
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import {
  CountryIso2,
  defaultCountries,
  FlagImage,
  getActiveFormattingMask,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';

import 'react-international-phone/style.css';

interface Props {
  value: string;
  required?: boolean;
  onChange: ({
    phone,
    country,
  }: {
    phone: string;
    country: CountryIso2 | '';
    error: boolean;
  }) => void;
  label: string;
}

const PhoneInput = ({
  value,
  onChange,
  label,
  required,
  ...textFieldProps
}: Omit<TextFieldProps, 'onChange'> & Props) => {
  const [phone, setPhone] = useState(value);

  const browserLocales = navigator.language.split('-');
  const defaultCountry =
    browserLocales[browserLocales.length - 1].toLowerCase();

  const {inputValue, handlePhoneValueChange, inputRef, country, setCountry} =
    usePhoneInput({
      defaultCountry: defaultCountry || defaultCountries[0][1],
      value: phone,
      countries: defaultCountries,
      onChange: ({phone, country}) => {
        setPhone(phone);
        const mask = getActiveFormattingMask({
          phone: phone,
          country: country,
        });
        const digitnumbers = mask.split('').filter(c => c === '.').length;
        const isValid =
          phone.length === 1 + country.dialCode.length + digitnumbers;
        if (isValid) {
          onChange({phone, country: country.iso2, error: false});
        } else {
          onChange({phone: '', country: '', error: true});
        }
      },
    });

  return (
    <TextField
      fullWidth
      required={required}
      error={inputValue && (!phone || value !== phone)}
      {...textFieldProps}
      label={label}
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{marginRight: '2px', marginLeft: '-8px'}}
          >
            <Select
              MenuProps={{
                style: {
                  height: '300px',
                  width: '360px',
                  top: '10px',
                  left: '-34px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                width: 'max-content',
                // Remove default outline (display only on focus)
                fieldset: {
                  display: 'none',
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: 'block',
                  },
                },
                // Update default spacing
                '.MuiSelect-select': {
                  padding: '8px',
                  paddingRight: '24px !important',
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={e => setCountry(e.target.value)}
              renderValue={value => (
                <FlagImage iso2={value} style={{display: 'flex'}} />
              )}
            >
              {defaultCountries.map(c => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage
                      iso2={country.iso2}
                      style={{marginRight: '8px'}}
                    />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PhoneInput;
