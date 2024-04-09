import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import ShareEvent from '../ShareEvent';
import SupportCaroster from '../SupportCaroster';

interface Props {
  eventName: string;
  title: string;
  description: string;
  showImage?: boolean;
}

const NoCar = ({eventName, title, description, showImage}: Props) => {
  const theme = useTheme();

  return (
    <Box
      my={4}
      mx="auto"
      pb={16}
      mt={9}
      maxWidth="100%"
      width={340}
    >
      <Typography variant="h6" align="center" color="textSecondary">
        {title}
      </Typography>
      {showImage && (
        <Box
          component="img"
          sx={{
            display: 'block',
            margin: '0 auto',
            width: '100%',
            height: 'auto',

            [theme.breakpoints.down('md')]: {
              width: '50%',
            },
          }}
          src="/assets/car.png"
        />
      )}
      <Typography sx={{whiteSpace: 'pre-line', mt: 4}} color="textSecondary">
        {description}
      </Typography>
      <ShareEvent
        color="primary"
        sx={{
          mt: 4,
          backgroundColor: '#fff',
        }}
        title={`Caroster ${eventName}`}
      />
      <Box mt={4} display="flex" justifyContent="center">
        <SupportCaroster />
      </Box>
    </Box>
  );
};

export default NoCar;
