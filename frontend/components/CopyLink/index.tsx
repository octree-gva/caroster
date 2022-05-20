import Button, { ButtonProps } from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

interface Props {
  buttonText: string;
  title: string;
  url: string;
  onShare: () => void;
}

const CopyLink = ({buttonText, title, url, onShare, ...buttonProps}: ButtonProps & Props) => {
  const share = async () => {
    if (!url || !title) return null;
    // If navigator share capability
    if (!!navigator.share)
      return await navigator.share({
        title,
        url,
      });
    // Else copy URL in clipboard
    else if (!!navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      onShare();
      return true;
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<Icon>share</Icon>}
      onClick={share}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
};

export default CopyLink;
