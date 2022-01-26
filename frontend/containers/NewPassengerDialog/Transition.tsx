import Slide from '@material-ui/core/Slide';
import {forwardRef} from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Transition;