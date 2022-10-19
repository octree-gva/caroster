import {useRouter} from 'next/router';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

const PREFIX = 'DashboardEmpty';

const classes = {
  container: `${PREFIX}-container`
};

const StyledContainer = styled(Container)((
  {
    theme
  }
) => ({
  [`&.${classes.container}`]: {
    paddingTop: theme.spacing(8),
  }
}));

const DashboardEmpty = () => {
  const {t} = useTranslation();
  const router = useRouter();


  return (
    <StyledContainer maxWidth="sm" className={classes.container}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1">
            {t('dashboard.noEvent.title')}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={{
              __html: t('dashboard.noEvent.text_html'),
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={() => router.push('/')}
            variant="contained"
            color="primary"
          >
            {t('dashboard.noEvent.create_event')}
          </Button>
        </CardActions>
      </Card>
    </StyledContainer>
  );
};

export default DashboardEmpty;
