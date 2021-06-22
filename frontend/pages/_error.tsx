import {useTranslation} from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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

export default NotFoundPage;
