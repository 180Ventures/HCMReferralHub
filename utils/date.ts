import { FORMAT_DATE } from '@/constants';
import moment from 'moment';

interface IMonthsData {
  month: number;
  start: string;
  end: string;
}
export const getStartAndEndDate12Month = () => {
  const monthsData: IMonthsData[] = [];
  for (let i = 0; i < 12; i++) {
    const startOfMonth = moment().clone().startOf('month').month(i).format(FORMAT_DATE.monthDayYear);
    const endOfMonth = moment().clone().endOf('month').month(i).format(FORMAT_DATE.monthDayYear);
    monthsData.push({
      month: i + 1, // Month index starts from 0, so add 1
      start: startOfMonth,
      end: endOfMonth,
    });
  }
  return monthsData;
};
