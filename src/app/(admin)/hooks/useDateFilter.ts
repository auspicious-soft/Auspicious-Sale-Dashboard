import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export const useDateFilter = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const getApiUrl = (baseUrl: string, date: Dayjs | null) => {
    if (!date) return null;
    const month = date.month() + 1;
    const year = date.year();
    return `${baseUrl}?month=${month}&year=${year}`;
  };

  return {
    selectedDate,
    setSelectedDate,
    getApiUrl,
    maxDate: dayjs(),
    minDate: dayjs().subtract(20, "year")
  };
};