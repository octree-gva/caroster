import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DefaultLayout from './Default';

const CenteredLayout = ({children, ...props}) => {
  const classes = useStyles();

  return (
    <DefaultLayout className={classes.layout} {...props}>
      <Container maxWidth="sm">{children}</Container>
    </DefaultLayout>
  );
};

const useStyles = makeStyles(() => ({
  layout: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default CenteredLayout;
