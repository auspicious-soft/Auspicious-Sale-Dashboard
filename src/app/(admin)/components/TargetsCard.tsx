"use client";
import React, { useState, useTransition } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EditTargetModal from "./TargetsModal";
import { EditBid, TotalEarningsIcon, TotalTargetIcon } from "@/utils/svgicons";
import { targetModalStats } from "@/services/admin/admin-service";
interface targetProps {
  totalEarning: number;
  totalTarget: number;
}
interface GroupedUsers {
  [key: string]: {
    userId: string;
    fullName: string;
    targetAmount: number;
    technologyId: string;
    targetDate: string;
  }[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  groupedUsers: GroupedUsers;
}
export default function TargetsCard(props: targetProps) {
  const {totalEarning, totalTarget} = props;
  
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  const maxDate = dayjs();
  const minDate = dayjs().subtract(20, "year");

  const fetchTargetModalStats = async (month: string, year: string) => {
    try {
      const payload = {
        month,  
        year
      };
      const response = await targetModalStats("/admin/target-data", payload);
      return response.data as ApiResponse;
    } catch (error) {
      console.error("Error fetching target stats:", error);
      throw error;
    }
  };
 
  const openTargetModal = () => {
    if (!selectedMonth || !selectedYear) return;

    startTransition(async () => {
      try {
        const month = selectedMonth.format("MM");
        const year = selectedYear.format("YYYY");
        
        const response = await fetchTargetModalStats(month, year);
        
        if (response.success) {
          setModalData(response.groupedUsers);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error in openTargetModal:", error); 
      }
    });
  };


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
              value={selectedMonth}
              onChange={(newValue) => setSelectedMonth(newValue)}
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
              value={selectedYear}
              onChange={(newValue) => setSelectedYear(newValue)}
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
            ${totalTarget}
            </span>
          </div>
          <p className="text-[#1C2329] text-[12px] mt-[4px]">Total Target </p>
          <button className="absolute top-[-18px] right-0" 
           onClick={openTargetModal}
           disabled={isPending}
          >
            <EditBid />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
                <TotalEarningsIcon />
             </div>
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">${totalEarning}</span>
          </div>
          <p className="text-[#1C2329] text-[12px] mt-[4px]">Total Earnings</p>
        </div>
      </div>

      {/* Modal */}
      <EditTargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
        isPending={isPending}
      />
    </div>
  );
}
