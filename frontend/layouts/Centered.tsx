import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DefaultLayout from './Default';

const CenteredLayout = ({children, ...props}) => {
  return (
    <DefaultLayout {...props}>
      <Box pt={12} position="relative">
        <Container maxWidth="sm">{children}</Container>
      </Box>
    </DefaultLayout>
  );
};

export default CenteredLayout;
