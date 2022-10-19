import {useTranslation} from 'react-i18next';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Link from 'next/link';

const PREFIX = 'Success';

const classes = {
  successCard: `${PREFIX}-successCard`,
  successIcon: `${PREFIX}-successIcon`,
  actions: `${PREFIX}-actions`
};

const StyledCard = styled(Card)((
  {
    theme
  }
) => ({
  [`&.${classes.successCard}`]: {
    textAlign: 'center',
  },

  [`& .${classes.successIcon}`]: {
    fontSize: theme.spacing(14),
  },

  [`& .${classes.actions}`]: {
    justifyContent: 'center',
  }
}));

const Success = ({email}) => {
  const {t} = useTranslation();


  return (
    <StyledCard className={classes.successCard}>
      <CardContent>
        <Icon size="large" color="primary" className={classes.successIcon}>
          done
        </Icon>
      </CardContent>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {t('lost_password.sent', {email})}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Link href="/auth/login" passHref>
          <Button id="LostPasswordRegister" color="primary" variant="contained">
            {t('lost_password.actions.login')}
          </Button>
        </Link>
      </CardActions>
    </StyledCard>
  );
};

export default Success;
