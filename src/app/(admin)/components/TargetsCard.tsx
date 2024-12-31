"use client";
import React, { useEffect, useState, useTransition } from "react";
import dayjs, { Dayjs } from "dayjs";
import EditTargetModal from "./TargetsModal";
import { EditBid, TotalEarningsIcon, TotalTargetIcon, ViewIcon } from "@/utils/svgicons";
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
  const [selectedMonth, setSelectedMonth] = useState<any>();
  const [selectedYear, setSelectedYear] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { selectedDate, setSelectedDate, getApiUrl, maxDate, minDate } =
  useDateFilter();
  
  const { data, error, isLoading } = useSWR(`/admin/target-stat?month=${selectedMonth}&year=${selectedYear}`, targetValuCard );

  const targetValu = data?.data?.data;
  console.log('targetValu:', targetValu);

  const currentMonth = dayjs().month() + 1; // Get the current month (1-12)
  const currentYear = dayjs().year();

  useEffect(() => {
    if (selectedDate) {
      const month = selectedDate.month() + 1; 
      const year = selectedDate.year();
  
      setSelectedYear(year);
      setSelectedMonth(month);
    } 
  }, [selectedDate]);
  
  const {data: targetData, mutate} = useSWR(`/admin/target-data?month=${selectedMonth}&year=${selectedYear}`,targetModalStats)
   const modalData = targetData?.data?.groupedUsers;
   console.log('modalData:', modalData);


  const openTargetModal = () => {
      setIsModalOpen(true);
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
          Error loading data
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
          <button
            className="absolute top-[-18px] right-0"
            onClick={openTargetModal}
            disabled={isPending}
          >
             {selectedYear === currentYear && selectedMonth === currentMonth ? (
              <EditBid />
            ) : (
             <ViewIcon/>
            )}
          </button>
        </div>
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <TotalEarningsIcon />
            </div>
            <span className="text-[26px] md:text-[40px] font-RalewaySemiBold text-[#10375C]">
              ${targetValu?.totalEarnings}
            </span>
          </div>
          <p className="text-[#1C2329] text-[12px] mt-[4px]">Total Earnings</p>
        </div>
      </div>

      {/* Modal */}
      <EditTargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
        total={targetValu?.totalTargetAmount}
        mutate={mutate}
        year={selectedYear}
        month={selectedMonth}
      />
    </div>
  );
}
