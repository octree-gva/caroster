import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DefaultLayout from './Default';
import {ReactNode} from 'react';
import {Breakpoint} from '@mui/material';

interface Props {
  children: ReactNode;
  maxWidth?: Breakpoint;
}

const CenteredLayout = ({children, ...props}: Props) => {
  const {maxWidth = 'sm'} = props;
  return (
    <DefaultLayout {...props}>
      <Box pt={12} position="relative">
        <Container maxWidth={maxWidth}>{children}</Container>
      </Box>
    </DefaultLayout>
  );
};

export default CenteredLayout;
