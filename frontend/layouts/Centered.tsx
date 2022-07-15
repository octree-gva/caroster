import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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
