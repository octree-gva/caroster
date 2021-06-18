import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';

const EmptyDashboard = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
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
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  container: {paddingTop: theme.spacing(8)},
}));

export default EmptyDashboard;
