import {useRouter} from 'next/router';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useTranslation} from 'next-i18next';

const DashboardEmpty = () => {
  const {t} = useTranslation();
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{pt: 8}}>
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
            onClick={() => router.push('/new')}
            variant="contained"
            color="primary"
          >
            {t('dashboard.noEvent.create_event')}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default DashboardEmpty;
