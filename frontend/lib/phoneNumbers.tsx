import {
    CountryIso2,
    defaultCountries,
    getActiveFormattingMask,
    parseCountry,
  } from 'react-international-phone';

export const getFormatedPhoneNumber = ({
    phone,
    phoneCountry,
  }: {
    phone: string;
    phoneCountry: CountryIso2;
  }): string => {
    if (!phoneCountry || phoneCountry === '') return phone;
    const parsedCountry = parseCountry(
      defaultCountries.find(country => country[1] === phoneCountry)
    );
    const activeMask = getActiveFormattingMask({phone, country: parsedCountry});
    let splittedPhone = phone.split(parsedCountry.dialCode)[1].split('');
  
    const maskWithValues = activeMask
      .split('')
      .map(char => {
        if (char === '.') {
          return splittedPhone.shift();
        }
        return char;
      })
      .join('');
  
    return `+${parsedCountry.dialCode} ${maskWithValues}`;
  };