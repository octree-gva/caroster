import Container from '@mui/material/Container';
import {useTheme} from '@mui/material/styles';

const MasonryContainer = ({children}) => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="sm"
      sx={{
        p: 1,
        mb: 10,
        outline: 'none',
        '& > *': {
          cursor: 'default',
        },

        [theme.breakpoints.down('md')]: {
          marginBottom: `calc(${theme.spacing(10)} + 56px)`,
        },
      }}
    >
      {children}
    </Container>
  );
};

export default MasonryContainer;
