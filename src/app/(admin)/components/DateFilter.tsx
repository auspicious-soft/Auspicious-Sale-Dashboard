import React from 'react';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
 
interface DateFilterProps {
  selectedDate: Dayjs | null;
  onDateChange: (newValue: Dayjs | null) => void;
  minDate: Dayjs;
  maxDate: Dayjs;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  selectedDate,
  onDateChange,
  minDate,
  maxDate
}) => (
  <div className="flex items-center gap-4 max-w-[270px]">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Month"
        openTo="month"
        views={["month"]}
        value={selectedDate}
        onChange={onDateChange}
        minDate={minDate}
        maxDate={maxDate}
        sx={{
          "& .MuiOutlinedInput-input": {
            fontSize: "12px",
            padding: "12px 10px",
          },
        }}
      />
      <DatePicker
        className="border-[#000] input-custom"
        label="Year"
        openTo="year"
        views={["year"]}
        value={selectedDate}
        onChange={onDateChange}
        minDate={minDate}
        maxDate={maxDate}
        sx={{
          "& .MuiOutlinedInput-input": {
            fontSize: "12px",
            padding: "12px 10px",
          },
        }}
      />
    </LocalizationProvider>
  </div>
);