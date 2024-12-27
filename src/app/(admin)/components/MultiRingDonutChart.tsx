// Updated Home component using the new patterns
"use client";
import React from "react";
import StatisticsChart from "../components/StatisticsChart";
import { dashboardchart } from "@/services/admin/admin-service";
import useSWR from "swr";
import { useDateFilter } from "../hooks/useDateFilter";
import { DateFilter } from "./DateFilter";

const Home: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    getApiUrl,
    maxDate,
    minDate
  } = useDateFilter();

  const { data, error, isLoading } = useSWR(
    getApiUrl('/admin/dashboardchartstat', selectedDate),
    dashboardchart,
    {
      revalidateOnFocus: false
    }
  ); 

  const dashboardData = data?.data?.data;

  const bidsThisMonth = Array.isArray(dashboardData?.bidsThisMonths)
    ? dashboardData.bidsThisMonths
    : [];
  const amount = dashboardData?.bidsThisMonths?.amount ?? 0;

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
    <div className="flex flex-col pt-[20px] pb-[30px] md:pb-[50px]">
      <div className="w-full max-w-[540px] border-solid border-[1px] border-[#5D5FEF] rounded-[20px] py-[25px] px-[15px] md:px-[30px]">
        <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h3 className="text-[20px] font-RalewaySemiBold">Statistics</h3>
          <DateFilter
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            minDate={minDate}
            maxDate={maxDate} 
          />
        </div>

        <div className="flex items-center justify-center gap-[15px] md:gap-[50px]">
          <StatisticsChart
            amount={Number(amount)}
            responseRate={dashboardData?.responserate || 0}
            hiringRate={dashboardData?.hiringrate || 0}
          />
          <div>
            <div className="flex flex-col gap-1 mb-[20px]">
              <h3 className="text-[#10375C] text-[30px] font-RalewaySemiBold">
                {Math.round(dashboardData?.responserate || 0)}%
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className="w-[16px] h-[10px] inline-block rounded-[18px]"
                  style={{ backgroundColor: "#7AE071" }}
                ></span>
                <span className="text-[12px] text-[#1C2329] font-RalewayMedium">
                  Response rate
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[#10375C] text-[30px] font-RalewaySemiBold">
                {Math.round(dashboardData?.hiringrate || 0)}%
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className="w-[16px] h-[10px] inline-block rounded-[18px]"
                  style={{ backgroundColor: "#FD5602" }}
                ></span>
                <span className="text-[12px] text-[#1C2329] font-RalewayMedium">
                  Hiring rate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;