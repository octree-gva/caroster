import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import {useTranslation} from 'react-i18next';
const PREFIX = 'SignUpActions';

const classes = {
  actions: `${PREFIX}-actions`
};

const StyledCardActions = styled(CardActions)((
  {
    theme
  }
) => ({
  [`&.${classes.actions}`]: {
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  }
}));

const SignUpActions = () => {
  const {t} = useTranslation();


  return (
    <StyledCardActions className={classes.actions}>
      <Link href="/auth/login" passHref>
        <Button id="SignUpLogin" variant="text">
          {t('signup.login')}
        </Button>
      </Link>
    </StyledCardActions>
  );
};

export default SignUpActions;
