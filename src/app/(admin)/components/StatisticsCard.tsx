"use client";
import React from "react";
import { useDateFilter } from "../hooks/useDateFilter";
import { DateFilter } from "./DateFilter";
import useSWR from "swr";
import { targetPercentageStatistics } from "@/services/admin/admin-service";
import { AxiosResponse } from "axios";

// Define the API response structure
interface StatsData {
  monthlytargetstat: number;
}

// Define the type for the API response wrapper
interface ApiResponse {
  data: StatsData;
}

export default function StatisticsCard() {
  const { selectedDate, setSelectedDate, getApiUrl, maxDate, minDate } =
    useDateFilter();

  // Create a fetcher function that handles the Axios response
  const fetcher = async (url: string) => {
    const response: AxiosResponse<ApiResponse> =
      await targetPercentageStatistics(url);
    return response.data.data;
  };

  const {
    data: stats,
    error,
    isLoading,
  } = useSWR<StatsData>(
    getApiUrl("/admin/target-percentage-stat", selectedDate),
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const targetValue = stats?.monthlytargetstat;

  const getTargetMessage = (statsValue: number | undefined): string => {
    if (statsValue === undefined || isNaN(statsValue)) {
      return "No statistics available";
    }
    if (statsValue < 100) {
      return "Monthly Target not Achieved";
    } else if (statsValue === 100) {
      return "Monthly Target Achieved";
    } else {
      return "Monthly Target over Achieved";
    }
  };

  const targetMessage = getTargetMessage(targetValue);

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
          Error loading statistics data
        </div>
      </div>
    );
  }

  return (
    <div className="border-solid border-[1px] border-[#5D5FEF] rounded-2xl flex-col md:min-h-[100%] py-[18px] px-[20px] md:px-[30px] ml-[0px] md:ml-[20px]  mt-[20px] md:mt-[0px]">
      <div className="w-full flex items-center justify-between gap-4 mb-[25px] flex-wrap">
        <h3 className="text-lg font-RalewaySemiBold">Statistics</h3>
        <DateFilter
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>

      {/* Targets */}
      <div className="flex items-center gap-[10px] md:gap-[20px] w-full bg-[#5D5FEF] p-[10px] rounded-[10px] text-[#fff] font-RalewayMedium text-[14px] md:text-[18px]">
        <div className="bg-[#3335D1] rounded-[5px] p-[10px] text-[20px] md:text-[24px]">
          {targetValue !== undefined && !isNaN(targetValue)
            ? `${Math.round(targetValue)}%`
            : "0%"}
        </div>
        {targetMessage}
      </div>
    </div>
  );
}
