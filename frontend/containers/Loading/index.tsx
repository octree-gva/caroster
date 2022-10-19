import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
const PREFIX = 'Loading';

const classes = {
  container: `${PREFIX}-container`
};

const StyledContainer = styled(Container)((
  {
    theme
  }
) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }
}));

const Loading = () => {

  return (
    <StyledContainer className={classes.container}>
      <CircularProgress />
    </StyledContainer>
  );
};

export default Loading;
