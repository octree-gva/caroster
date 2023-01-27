import {Link} from '@mui/material';
import {useTranslation} from 'react-i18next';
import useSettings from '../../hooks/useSettings';

type Props = {};

const SupportCaroster = (props: Props) => {
  const settings = useSettings();
  const {t} = useTranslation();

  return (
    <Link
      href={settings['opencollective_link']}
      color="textSecondary"
      target="_blank"
    >
      {t`supportCaroster`}
    </Link>
  );
};

export default SupportCaroster;
