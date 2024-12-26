"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StatisticsCard(props: any) {
  const {stats} = props;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  // Define min and max dates
  const maxDate = dayjs();
  const minDate = dayjs().subtract(20, "year");
  let targetMessage = "";
  if (stats < 100) {
    targetMessage = "Monthly Target not Achieved";
  } else if (stats === 100) {
    targetMessage = "Monthly Target Achieved";
  } else if (stats > 100) {
    targetMessage = "Monthly Target over Achieved";
  }

  return (
    <div className="border-solid border-[1px] border-[#5D5FEF] rounded-2xl  flex-col min-h-[100%] py-[18px] px-[20px] md:px-[30px]">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4 mb-[25px] flex-wrap">
        <h3 className="text-lg font-RalewaySemiBold">Statistics</h3>
        {/* Date Picker Filters */}
        <div className="flex items-center gap-4 max-w-[270px]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Month"
              openTo="month"
              views={["month"]}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={minDate}
              maxDate={maxDate}
              sx={{
                '& .MuiOutlinedInput-input': {
                  fontSize: '12px',
                  padding: '12px 10px',
                },
              }}
            />
            <DatePicker
              label="Year"
              openTo="year"
              views={["year"]}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={minDate}
              maxDate={maxDate}
              sx={{
                '& .MuiOutlinedInput-input': {
                  fontSize: '12px',
                  padding: '12px 10px',
                },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      {/* Targets */}
      <div className="flex items-center gap-[10px] md:gap-[20px] w-full bg-[#5D5FEF] p-[10px] rounded-[10px] text-[#fff] font-RalewayMedium text-[14px] md:text-[18px]">
          <div className="bg-[#3335D1] rounded-[5px] p-[10px] text-[20px] md:text-[24px]">{Math.round(stats)}%</div>  {targetMessage}
      </div>
    </div>
  );
}
