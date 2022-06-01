import {Icon} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect} from 'react';
import {useElementSize, useEventListener} from 'usehooks-ts';
import Markdown from '../Markdown';
import useBannerStore from '../../stores/useBannerStore';

interface Props {
  message: string;
  open: boolean;
  onClear?: () => void;
}

const Banner = (props: Props) => {
  const {message, open, onClear} = props;
  const classes = useStyles();
  const [bannerRef, {height}] = useElementSize();
  const setBannerHeight = useBannerStore(s => s.setBannerHeight);
  useEffect(() => setBannerHeight({height}), [height]);

  if (!open) return null;

  return (
    <div className={classes.banner} ref={bannerRef}>
      <Markdown className={classes.htmlReset}>{message}</Markdown>
      <Button
        className={classes.clear}
        onClick={e => {
          e.stopPropagation();
          onClear();
        }}
      >
        <Icon>close</Icon>
      </Button>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  banner: {
    position: 'relative',
    background: `linear-gradient(90deg, #FCDC61 20%, #78B2AC 90%)`,
    width: '100%',
    padding: '12px 60px',
    textAlign: 'center',
    zIndex: theme.zIndex.appBar - 1,
    color: 'black',
  },
  clear: {
    position: 'absolute',
    right: '12px',
    bottom: '50%',
    transform: 'translateY(50%)',
    minWidth: '44px',
    padding: '12px',
    lineHeight: '1.4em',
  },
  htmlReset: {
    '& a': {
      color: 'inherit',
      margin: 0,
    },
    '& p': {
      margin: 0,
    },
  },
}));

export default Banner;
