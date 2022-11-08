import Card from '@mui/material/Card';
import {useTheme} from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Layout from './Centered';
import Logo from '../components/Logo';

const CommonConfirm = ({children}) => {
  const theme = useTheme();
  return (
    <Layout displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <CardContent
          sx={{
            padding: theme.spacing(0, 8),
            '&:last-child': {
              paddingBottom: theme.spacing(12),
            },
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CommonConfirm;
