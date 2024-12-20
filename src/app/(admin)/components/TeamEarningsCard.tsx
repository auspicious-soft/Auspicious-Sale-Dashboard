"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { EarningsIcon } from "@/utils/svgicons";

export default function TeamEarningsCard() {
  const [totalBids, setTotalBids] = useState(240); // Default value
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Allow null

  const handleSave = () => {
    setIsEditing(false); // Exit edit mode
  };

  // Define min and max dates to restrict the year range
  const maxDate = dayjs(); // Current date
  const minDate = dayjs().subtract(20, "year"); // One year in the past

  return (
    <div className="p-3 md:p-7 bg-[#5D5FEF] rounded-2xl flex items-center flex-col justify-between mt-[20px]">
      <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap ">  
        <h3 className="text-lg font-RalewaySemiBold text-[#fff]">Team Earnings</h3>
         {/* Date Picker Filters */}
        <div className="flex items-center gap-4 max-w-[270px]"> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             {/* Month Picker */}  
             <DatePicker
              label="Month"
              openTo="month"
              views={["month"]}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={minDate} // Restrict to past year
              maxDate={maxDate} // Restrict to current month
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff', 
                  borderColor: '#fff', 
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff', 
                },
                '& .MuiOutlinedInput-input': {
                  color: '#fff', 
                  fontSize: '12px',
                  padding: '12px 10px',
                },
                '& .MuiInputLabel-root': {
                  color: '#fff', 
                },
                '& .MuiSvgIcon-root': {
                  color: '#fff', 
                },
              }}
            />
            {/* Year Picker */}
            <DatePicker
              className="border-[#fff] input-custom"
              label="Year"
              openTo="year"
              views={["year"]}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={minDate}
              maxDate={maxDate} //
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff', 
                  borderColor: '#fff', 
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff', 
                },
                '& .MuiOutlinedInput-input': {
                  color: '#fff', 
                  fontSize: '12px',
                  padding: '12px 10px',
                },
                '& .MuiInputLabel-root': {
                  color: '#fff', 
                },
                '& .MuiSvgIcon-root': {
                  color: '#fff', 
                },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="flex items-center justify-between w-full flex-wrap gap-8">
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
            <EarningsIcon />
             </div>
            <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">$3,100/<span className="text-[20px]">3100</span></span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By Web Team</p>
        </div>

        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
            <EarningsIcon />
             </div>
            <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">$3,100/<span className="text-[20px]">3100</span></span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By Mobile Team</p>
        </div>

        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
          <div className="relative top-[2px]">
          <EarningsIcon />
            </div>
            <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">$3,100/<span className="text-[20px]">3100</span></span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By Mobile Team</p>
        </div>

        <div>
            <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
           <EarningsIcon />
           </div>
           <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">$3,100/<span className="text-[20px]">3100</span></span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By MERN Team</p>
        </div>
      </div>
 
     
    </div>
  );
}
