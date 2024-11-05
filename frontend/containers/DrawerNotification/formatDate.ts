import moment from 'moment';
import {useTranslation} from 'next-i18next';

export const formatDate = (dateString: string) => {
  const momentDate = moment(dateString);
  const isToday = momentDate.isSame(moment(), 'day');
  const {t} = useTranslation();

  if (isToday) return `${t('date.today')}, ${momentDate.format('LT')}`;
  else return momentDate.format('DD/MM/YY, LT');
};
