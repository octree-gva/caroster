import {createPortal} from 'react-dom';
import Box from '@material-ui/core/Box';

const Dots = ({children}) =>
  createPortal(
    <Box className="slick-dots" component="ul" display="flex">
      <Box display="flex" margin="0 auto">
        {children}
      </Box>
    </Box>,
    document.getElementById('slider-dots')
  );

export default Dots;
