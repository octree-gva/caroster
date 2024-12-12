import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Layout from './Centered';
import Logo from '../components/Logo';

const CommonConfirm = ({children}) => {
  return (
    <Layout displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <CardContent
          sx={{
            px: 4,
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CommonConfirm;
