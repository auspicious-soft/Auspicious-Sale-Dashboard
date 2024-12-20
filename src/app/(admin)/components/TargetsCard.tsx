"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EditTargetModal from "./TargetsModal";
import { EditBid, TotalEarningsIcon, TotalTargetIcon } from "@/utils/svgicons";

export default function TargetsCard() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Define min and max dates
  const maxDate = dayjs();
  const minDate = dayjs().subtract(20, "year");

  return (
    <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4 mb-10 flex-wrap">
        <h3 className="text-lg font-RalewaySemiBold">Targets</h3>
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
      <div className="flex items-center justify-between w-full flex-wrap gap-8">
        {/* Total Target */}
        <div className="relative">
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <TotalTargetIcon />
            </div>
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">
              $12,400
            </span>
          </div>
          <p className="text-[#1C2329] text-[12px] mt-[4px]">Total Target </p>
          <button className="absolute top-[-18px] right-0" onClick={() => setIsModalOpen(true)}>
            <EditBid />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
                <TotalEarningsIcon />
             </div>
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">$12,400</span>
          </div>
          <p className="text-[#1C2329] text-[12px] mt-[4px]">Total Earnings</p>
        </div>
      </div>

      {/* Modal */}
      <EditTargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
