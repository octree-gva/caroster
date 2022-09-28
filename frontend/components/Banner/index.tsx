import {Icon} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import {hashText, setCookie} from '../../lib/cookies';
import Markdown from '../Markdown';

const ANNOUNCEMENT_COOKIE = 'lastAnnouncementSeen';

interface Props {
  announcement?: string;
}

const Banner = (props: Props) => {
  const {announcement} = props;
  const classes = useStyles();
  const [showBanner, setShowBanner] = useState(!!announcement);

  const onBannerClear = () => {
    const hashedMessage = hashText(announcement);
    setCookie(ANNOUNCEMENT_COOKIE, hashedMessage);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={classes.banner}>
      <Markdown className={classes.htmlReset}>{announcement}</Markdown>
      <Button
        className={classes.clear}
        onClick={e => {
          e.stopPropagation();
          onBannerClear();
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
