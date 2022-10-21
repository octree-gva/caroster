import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import {useTranslation} from 'react-i18next';

const SignUpActions = () => {
  const theme = useTheme()
  const {t} = useTranslation();


  return (
    <CardActions sx={{justifyContent: 'center',
    marginBottom: theme.spacing(2)}}>
      <Link href="/auth/login" passHref>
        <Button id="SignUpLogin" variant="text">
          {t('signup.login')}
        </Button>
      </Link>
    </CardActions>
  );
};

export default SignUpActions;
