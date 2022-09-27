import {styled} from '@material-ui/core/styles';
import Typography, {TypographyProps} from '@material-ui/core/Typography';
import {marked} from 'marked';

const Markdown = (props: TypographyProps) => {
  const {children, ...typographyProps} = props;

  if (!children) return null;

  const htmlContent = marked(children).replace(/\<\/?p\>/g, '');

  return (
    <Text
      {...typographyProps}
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
};

const Text = styled(Typography)(({theme}) => ({
  '& > *:first-child': {
    marginTop: 0,
  },
}));

export default Markdown;
