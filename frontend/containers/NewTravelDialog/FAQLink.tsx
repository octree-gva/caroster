import Link, {LinkProps} from '@mui/material/Link';

interface Props {
  text: string;
  link: string;
}

const FAQLink = ({text, link}: Props & LinkProps) => {

  return (
    <Link target="_blank" href={link}>
      {text}
    </Link>
  );
};

export default FAQLink;
