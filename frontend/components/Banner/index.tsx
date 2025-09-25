import {useState} from 'react';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Markdown from '../Markdown';
import {hashText, setCookie} from '../../lib/cookies';
import theme from '../../theme';

const ANNOUNCEMENT_COOKIE = 'lastAnnouncementSeen';

interface Props {
  announcement?: string;
}

const Banner = (props: Props) => {
  const {announcement} = props;

  const [showBanner, setShowBanner] = useState(
    !!announcement && announcement !== ''
  );

  const onBannerClear = () => {
    const hashedMessage = hashText(announcement);
    setCookie(ANNOUNCEMENT_COOKIE, hashedMessage);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        background: `linear-gradient(90deg, #FCDC61 20%, #78B2AC 90%)`,
        width: '100%',
        padding: '12px 60px',
        textAlign: 'center',
        zIndex: theme.zIndex.appBar - 1,
        color: 'black',
      }}
    >
      <Markdown
        sx={{
          '& a': {
            color: 'inherit',
            margin: 0,
          },
          '& p': {
            margin: 0,
          },
        }}
      >
        {announcement}
      </Markdown>
      <Button
        sx={{
          position: 'absolute',
          right: '12px',
          bottom: '50%',
          transform: 'translateY(50%)',
          minWidth: '44px',
          padding: '12px',
          lineHeight: '1.4em',
        }}
        onClick={e => {
          e.stopPropagation();
          onBannerClear();
        }}
      >
        <Icon>close</Icon>
      </Button>
    </Box>
  );
};

export default Banner;
