"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  EarningsIcon,
  EditBid,
  ProjectHireIcon,
  ResponsesIcon,
  TotalBids,
} from "@/utils/svgicons";
import { dashboradPage } from "@/services/admin/admin-service";
import useSWR from "swr";
 
const OverViewSection: React.FC = () => {
  const [amount, setAmount] = useState(10); // Default value for Amount
  const [isEditingBids, setIsEditingBids] = useState(false); // Toggle edit mode for Bids
  const [isEditingAmount, setIsEditingAmount] = useState(false); // Toggle edit mode for Amount
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Allow null
  const { data, error, isLoading, mutate } = useSWR( 
    "/admin/dashboard", 
    dashboradPage
  );

  const dashboardData = data?.data?.data;

  const handleSaveBids = () => {
    setIsEditingBids(false); // Exit edit mode for Bids
  };

  const handleSaveAmount = () => {
    setIsEditingAmount(false); // Exit edit mode for Amount
  };

  // Define min and max dates to restrict the year range
  const maxDate = dayjs(); // Current date
  const minDate = dayjs().subtract(20, "year"); // 20 years in the past

  return (
    <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between">
      <div className="w-full flex items-center justify-between gap-4 mb-10 flex-wrap">
        <h3 className="text-[20px] font-RalewaySemiBold">Overview</h3>
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
                "& .MuiOutlinedInput-input": {
                  fontSize: "12px",
                  padding: "12px 10px",
                },
              }}
            />
            {/* Year Picker */}
            <DatePicker
              className="border-[#000] input-custom"
              label="Year"
              openTo="year"
              views={["year"]}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={minDate} // Restrict to past year
              maxDate={maxDate} // Restrict to current year
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "12px",
                  padding: "12px 10px",
                },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="flex items-center justify-between w-full flex-wrap gap-8">
        {/* Total Bids */}
        <div
          className="cursor-pointer"
          onClick={() => setIsEditingAmount(true)}
        >
          <div className="flex items-center gap-[10px] md:gap-[20px] relative">
            {/* Edit Icon */}
            <span className="cursor-pointer absolute right-[-15px] top-[-15px]">
              <EditBid />
            </span>
            <div className="relative top-[2px]">
            <TotalBids />
            </div>
            {isEditingAmount ? (
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                onBlur={handleSaveAmount} // Save on blur
                className="border border-gray-300 rounded p-1 w-[120px] min-h-[50px] text-[20px] font-RalewaySemiBold text-[#10375C]"
              />
            ) : (
              <span className="font-RalewaySemiBold text-[26px] md:text-[40px] text-[#10375C]">
                {amount}
              </span>
            )}
          </div>
          <p className="text-[#1C2329] text-[12px] font-RalewayMedium mt-[4px]">
          Total Bids
          </p>
        </div>

        {/* Number of Responses */}
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <ResponsesIcon />
            </div>
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">
              {dashboardData?.totalresponses}{" "}
            </span>
          </div>
          <p className="text-[#1C2329] text-[12px] font-RalewayMedium mt-[4px]">
            No of Responses
          </p>
        </div>

        {/* Project Hired */}
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <ProjectHireIcon />
            </div>
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">
              {dashboardData?.projecthired}
            </span>
          </div>
          <p className="text-[#1C2329] text-[12px] font-RalewayMedium mt-[4px]">
            Project Hired
          </p>
        </div>

        {/* Earnings */}
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <EarningsIcon />
            </div>
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">
              {dashboardData?.totalEarnings}
            </span>
          </div>
          <p className="text-[#1C2329] text-[12px] font-RalewayMedium mt-[4px]">
            Earnings
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverViewSection;
