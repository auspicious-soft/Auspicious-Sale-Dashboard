"use client";
import React, { useState, useTransition } from "react";
import dayjs, { Dayjs } from "dayjs";
import EditTargetModal from "./TargetsModal";
import { EditBid, TotalEarningsIcon, TotalTargetIcon } from "@/utils/svgicons";
import { targetModalStats } from "@/services/admin/admin-service";
import { targetValuCard } from "@/services/admin/admin-service";
import useSWR from "swr";
import { useDateFilter } from "../hooks/useDateFilter";
import { DateFilter } from "./DateFilter";

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
export default function TargetsCard() {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    selectedDate,
    setSelectedDate,
    getApiUrl,
    maxDate,
    minDate
  } = useDateFilter();

  const { data, error, isLoading, mutate } = useSWR(getApiUrl('/admin/target-stat', selectedDate), targetValuCard,
    {
      revalidateOnFocus: false
    }
  ); 

  const targetValu = data?.data?.data;  
  

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
  if (isLoading) {
    return (
      <div className="flex flex-col pt-[20px] pb-[30px] md:pb-[50px]">
        <div className="w-full max-w-[540px] border-solid border-[1px] border-[#5D5FEF] rounded-[20px] py-[25px] px-[15px] md:px-[30px]">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col pt-[20px] pb-[30px] md:pb-[50px]">
        <div className="w-full max-w-[540px] border-solid border-[1px] border-[#5D5FEF] rounded-[20px] py-[25px] px-[15px] md:px-[30px]">
          Error loading  data
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4 mb-10 flex-wrap">
        <h3 className="text-lg font-RalewaySemiBold">Targets</h3>
         <DateFilter
                     selectedDate={selectedDate}
                     onDateChange={setSelectedDate}
                     minDate={minDate}
                     maxDate={maxDate} 
                   />
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
            {targetValu?.totalTargetAmount}
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
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">${targetValu?.totalEarnings}</span>
          </div>
          <p className="text-[#1C2329] text-[12px] mt-[4px]">Total Earnings</p>
        </div>
      </div>

      {/* Modal */}
      <EditTargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData} 
        total ={targetValu?.totalTargetAmount}
      />
    </div>
  );
}
