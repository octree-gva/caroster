import Link from '@material-ui/core/Link';
import useSettings from '../../hooks/useSettings';

interface Props {
  text: string;
  link: string;
}

const FAQLink = ({text, link}: Props) => {
  const settings = useSettings();

  return <Link target="_blank" href={`${settings?.faq_link}${link}`}>{text}</Link>;
};

export default FAQLink;
