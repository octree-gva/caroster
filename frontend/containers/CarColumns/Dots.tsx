import {createPortal} from 'react-dom';
import Box from '@material-ui/core/Box';

const Dots = ({children}) => {
  const element = document.getElementById('slider-dots');
  if (!element) return null;

  return createPortal(
    <Box
      className="slick-dots"
      component="ul"
      height={1}
      display="flex"
      alignItems="center"
    >
      <Box display="flex" margin="0 auto">
        {children}
      </Box>
    </Box>,
    document.getElementById('slider-dots')
  );
};

export default Dots;
