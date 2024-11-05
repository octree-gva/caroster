import FormControl from '@mui/material/FormControl';
import {Enum_Event_Lang} from '../../generated/graphql';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {langs, langLocales} from '../../locales/constants';

type Props = {
  value: Enum_Event_Lang;
  onChange: (lang: Enum_Event_Lang) => void;
};

const LangSelector = (props: Props) => {
  return (
    <FormControl fullWidth>
      <Select
        labelId="lang-selector"
        id="lang-selector"
        variant="standard"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
        {langs.map(
          lang =>
            langLocales[lang] && (
              <MenuItem value={lang} key={lang}>
                {langLocales[lang]}
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
};
export default LangSelector;
