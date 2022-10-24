import Card from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Layout from './Centered';
import Logo from '../components/Logo';

const PREFIX = 'CommonConfirm';

const classes = {
  wrapper: `${PREFIX}-wrapper`,
};

const StyledLayout = styled(Layout)(({theme}) => ({
  [`& .${classes.wrapper}`]: {
    padding: theme.spacing(0, 8),
    '&:last-child': {
      paddingBottom: theme.spacing(12),
    },
  },
}));

const CommonConfirm = ({children}) => {
  return (
    <StyledLayout displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <CardContent className={classes.wrapper}>{children}</CardContent>
      </Card>
    </StyledLayout>
  );
};

export default CommonConfirm;
