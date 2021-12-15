import Joyride from 'react-joyride';
import {useTheme} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import useTour from '../../hooks/useTour';

interface Props {}

const OnBoardingTour = (props: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const {run, steps, step, onTourChange} = useTour();

  return (
    <Joyride
      run={run}
      steps={steps}
      stepIndex={step}
      callback={onTourChange}
      locale={t('joyride', {returnObjects: true})}
      continuous={true}
      showProgress={true}
      disableScrolling={true}
      disableScrollParentFix={true}
      scrollToFirstStep={false}
      floaterProps={{
        disableAnimation: true,
      }}
      styles={{
        options: {
          primaryColor: theme.palette.primary.main,
        },
        tooltipContent: {
          whiteSpace: 'pre-wrap',
        },
      }}
    />
  );
};

export default OnBoardingTour;
