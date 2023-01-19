import {useTranslation} from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  statusCode: number;
  title?: string;
}

const NotFoundPage = (props: Props) => {
  const {t} = useTranslation();
  const {statusCode = 404, title = t`generic.errors.not_found`} = props;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Typography variant="overline">
        {statusCode} - {title}
      </Typography>
    </Box>
  );
};

export async function getServerSideProps(props) {
  return props
}

export default NotFoundPage;
