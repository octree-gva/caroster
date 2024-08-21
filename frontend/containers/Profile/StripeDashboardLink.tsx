import {Box, Button, Typography} from '@mui/material';
import {useTranslation} from 'next-i18next';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useSettings from '../../hooks/useSettings';
import Link from 'next/link';

type Props = {};

const StripeDashboardLink = (props: Props) => {
  const {t} = useTranslation();
  const {stripe_dashboard_link} = useSettings();

  if (!stripe_dashboard_link) return null;

  return (
    <Box px={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{t`profile.stripe_link.title`}</Typography>
        <Link href={stripe_dashboard_link} target="_blank">
          <Button
            endIcon={<OpenInNewIcon />}
          >{t`profile.stripe_link.button`}</Button>
        </Link>
      </Box>
    </Box>
  );
};
export default StripeDashboardLink;
