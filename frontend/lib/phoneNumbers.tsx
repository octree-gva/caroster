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
  const regex = new RegExp(`\\+(${parsedCountry.dialCode})?0?`);
  let splittedPhone = phone.replace(regex, '').split('');

  const maskWithValues = activeMask
    .split('')
    .map(char => (char === '.' ? splittedPhone.shift() : char))
    .join('');

  return `+${parsedCountry.dialCode} ${maskWithValues}`;
};
