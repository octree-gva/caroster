import FormControl from '@mui/material/FormControl';
import {Enum_Event_Lang} from '../../generated/graphql';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useTranslation} from 'react-i18next';

type Props = {
  value: Enum_Event_Lang;
  onChange: (lang: Enum_Event_Lang) => void;
};

const LangSelector = (props: Props) => {
  const {t} = useTranslation();
  return (
    <FormControl fullWidth>
      <Select
        labelId="lang-selector"
        id="lang-selector"
        variant="standard"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
        <MenuItem value={'fr'}>{t`PROTECTED.languages.fr`}</MenuItem>
        <MenuItem value={'en'}>{t`PROTECTED.languages.en`}</MenuItem>
      </Select>
    </FormControl>
  );
};
export default LangSelector;
