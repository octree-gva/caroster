import Link, {LinkProps} from '@mui/material/Link';
import useSettings from '../../hooks/useSettings';

interface Props {
  text: string;
  link: string;
}

const FAQLink = ({text, link, sx}: Props & LinkProps) => {
  const settings = useSettings();

  return (
    <Link sx={sx} target="_blank" href={`${settings?.faq_link}${link}`}>
      {text}
    </Link>
  );
};

export default FAQLink;
