"use client";
import React from "react";
import { EarningsIcon } from "@/utils/svgicons";
import { targetTeamEarning } from "@/services/admin/admin-service";
import useSWR from "swr";
import { useDateFilter } from "../hooks/useDateFilter";
import { DateFilter } from "./DateFilter";
import { AxiosResponse } from "axios";

interface TeamEarningsData {
  technologyEarnings: {
    WebDevelopment: number;
    MobileDevelopment: number;
    SeoDevelopment: number;
    MERNDevelopment: number;
  };
  targetamount: {
    WebDevelopment: number;
    MobileDevelopment: number;
    SeoDevelopment: number;
    MERNDevelopment: number;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: TeamEarningsData;
}

export default function TeamEarningsCard() {
  const {
    selectedDate,
    setSelectedDate,
    getApiUrl,
    maxDate,
    minDate
  } = useDateFilter();

  const fetcher = async (url: string) => {
    const response: AxiosResponse<ApiResponse> = await targetTeamEarning(url);
    return response.data.data;
  };

  const { data, error, isLoading } = useSWR<TeamEarningsData>(
    getApiUrl('/admin/target-team-earning-stat', selectedDate),
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  if (isLoading) {
    return (
      <div className="p-3 md:p-7 bg-[#5D5FEF] rounded-2xl">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 md:p-7 bg-[#5D5FEF] rounded-2xl">
        <div className="text-white">Error loading data</div>
      </div>
    );
  }

  const { technologyEarnings, targetamount } = data || {
    technologyEarnings: { WebDevelopment: 0, MobileDevelopment: 0, SeoDevelopment: 0, MERNDevelopment: 0 },
    targetamount: { WebDevelopment: 0, MobileDevelopment: 0, SeoDevelopment: 0, MERNDevelopment: 0 }
  };

  return (
    <div className="p-3 md:p-7 bg-[#5D5FEF] rounded-2xl flex items-center flex-col justify-between mt-[20px]">
      <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap">  
        <h3 className="text-lg font-RalewaySemiBold text-[#fff]">Team Earnings</h3>
        <div className="[&_*]:!text-white [&_*]:!border-white">
          <DateFilter
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            minDate={minDate}
            maxDate={maxDate} 
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full flex-wrap gap-8">
        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]"> 
              <EarningsIcon />
            </div>
            <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">
              ${technologyEarnings?.WebDevelopment}/<span className="text-[20px]">{targetamount?.WebDevelopment}</span>
            </span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By Web Team</p>
        </div>

        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <EarningsIcon />
            </div>
            <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">
              ${technologyEarnings?.MobileDevelopment}/<span className="text-[20px]">{targetamount?.MobileDevelopment}</span>
            </span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By Mobile Team</p>
        </div>

        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <EarningsIcon />
            </div>
            <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">
              ${technologyEarnings?.SeoDevelopment}/<span className="text-[20px]">{targetamount?.SeoDevelopment}</span>
            </span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By SEO Team</p>
        </div>

        <div>
          <div className="flex items-center gap-[10px] md:gap-[20px]">
            <div className="relative top-[2px]">
              <EarningsIcon />
            </div>
            <span className="text-[26px] md:text-[30px] font-RalewaySemiBold text-[#ffffff]">
              ${technologyEarnings?.MERNDevelopment}/<span className="text-[20px]">{targetamount?.MERNDevelopment}</span>
            </span>
          </div>
          <p className="text-[#ffffff] text-[12px] mt-[4px]">Revenue By MERN Team</p>
        </div>
      </div>
    </div>
  );
}