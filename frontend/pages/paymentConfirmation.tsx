import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import {useTranslation} from 'next-i18next';
import Layout from '../layouts/Centered';
import Logo from '../components/Logo';
import pageUtils from '../lib/pageUtils';

const PaymentConfirmation = () => {
  const {t} = useTranslation();

  return (
    <Layout displayMenu={false}>
      <Container maxWidth="xs">
        <Card sx={{pt: 2, width: '100%'}}>
          <CardMedia component={Logo} />
          <CardContent>
            <Typography variant="h6" align="center">
              {t`paymentConfirmation.title`}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              whiteSpace="pre-line"
              pt={2}
            >{t`paymentConfirmation.description`}</Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default PaymentConfirmation;

export const getServerSideProps = pageUtils.getServerSideProps();
