import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DefaultLayout from './Default';
import useBannerStore from '../stores/useBannerStore';

const CenteredLayout = ({children, ...props}) => {
  const bannerHeight = useBannerStore(s => s.height);
  const bannerOffset = useBannerStore(s => s.offset)
  const classes = useStyles({bannerHeight, bannerOffset});

  return (
    <DefaultLayout className={classes.layout} {...props}>
      <Container maxWidth="sm">{children}</Container>
    </DefaultLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  layout: ({bannerHeight, bannerOffset}) => ({
    minHeight: `calc(100vh - ${bannerHeight})`,
    paddingTop: theme.mixins.toolbar.minHeight + bannerOffset - bannerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
}));

export default CenteredLayout;
