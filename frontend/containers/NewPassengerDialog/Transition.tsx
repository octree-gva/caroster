import Slide from '@mui/material/Slide';
import {forwardRef} from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Transition;