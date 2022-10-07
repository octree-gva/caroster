import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Layout from './Centered';
import Logo from '../components/Logo';

const CommonConfirm = ({children}) => {
  const {wrapper} = useStyles();

  return (
    <Layout displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <CardContent className={wrapper}>
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(0, 8 ),
    '&:last-child': {
      paddingBottom: theme.spacing(12),
    },
  },
}));

export default CommonConfirm;
