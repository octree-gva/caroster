import Link from '@material-ui/core/Link';
import useSettings from '../../hooks/useSettings';

interface Props {
  text: string;
  link: string;
  className: string;
}

const FAQLink = ({text, link, className}: Props) => {
  const settings = useSettings();

  return <Link className={className} target="_blank" href={`${settings?.faq_link}${link}`}>{text}</Link>;
};

export default FAQLink;
