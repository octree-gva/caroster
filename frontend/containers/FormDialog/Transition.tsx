import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {ReactElement, forwardRef} from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {children: ReactElement<any, any>},
  ref
) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      {props.children}
    </Slide>
  );
});

export default Transition;
