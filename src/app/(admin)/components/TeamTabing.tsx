"use client";
import { useState } from "react";
import WebTableCard from "./WebTableCard";
import MobileTableCard from "./MobileTableCard";
import SEOTableCard from "./SEOTableCard";
import MERNTableCard from "./MERNTableCard";
import { targetRevenueTable } from "@/services/admin/admin-service";
import useSWR from "swr";
import { useDateFilter } from "../hooks/useDateFilter";
import { DateFilter } from "./DateFilter";

const TabbedInterface = () => {
  const { selectedDate, setSelectedDate, getApiUrl, maxDate, minDate } =
    useDateFilter();

  const [activeTab, setActiveTab] = useState(0);

  const { data, error, isLoading } = useSWR(
    getApiUrl("/admin/target-revenue-stat", selectedDate),
    targetRevenueTable,
    {
      revalidateOnFocus: false,
    }
  );

  const targetRevenue = data?.data?.data?.groupedUsers;
  interface WebDevelopmentUser {
    userId: string;
    fullName: string;
    dailyEarnings: {
      [date: string]: number;
    };
  }
  // Preprocess data for Web Development
  const tabbingDataWeb: WebDevelopmentUser[] =
    targetRevenue?.WebDevelopment?.members.map((user: any) => ({
      userId: user.userId,
      fullName: user.fullName,
      dailyEarnings: user.dailyEarnings,
    }));

  interface MobileDevelopmentUser {
    userId: string;
    fullName: string;
    dailyEarnings: {
      [date: string]: number;
    };
  }
  const tabbingDataMobile: MobileDevelopmentUser[] =
    targetRevenue?.MobileDevelopment?.members.map((user: any) => ({
      userId: user.userId,
      fullName: user.fullName,
      dailyEarnings: user.dailyEarnings,
    }));
    interface MernDevelopmentUser {
      userId: string;
      fullName: string;
      dailyEarnings: {
        [date: string]: number;
      };
    }
    const tabbingDataMern: MernDevelopmentUser[] =
      targetRevenue?.MERNDevelopment?.members.map((user: any) => ({
        userId: user.userId,
        fullName: user.fullName,
        dailyEarnings: user.dailyEarnings,
      }));
      
      interface SeoDevelopmentUser {
        userId: string;
        fullName: string;
        dailyEarnings: {
          [date: string]: number;
        };
      }
      const tabbingDataSeo: SeoDevelopmentUser[] =
        targetRevenue?.SeoDevelopment?.members.map((user: any) => ({
          userId: user.userId,
          fullName: user.fullName,
          dailyEarnings: user.dailyEarnings,
        }));

  const tabs = [
    {
      name: "Web",
      component: (
        <WebTableCard
          tabbingDataWeb={tabbingDataWeb || []}
          isLoading={isLoading}
          error={error}
        />
      ),
    },

    {
      name: "Mobile",
      component: (
        <MobileTableCard
          tabbingDataMobile={tabbingDataMobile || []}
          isLoading={isLoading}
          error={error}
        />
      ),
    },
    { 
      name: " MERN", 
      component: <MERNTableCard
        tabbingDataMern={tabbingDataMern || []}
        isLoading={isLoading}
        error={error} 
      /> 
    },
    { name: "SEO", 
      component: <SEOTableCard 
        tabbingDataSeo={tabbingDataSeo || []}
        isLoading={isLoading}
        error={error} 
      />
     },
  ];

  return (
    <div className="w-full mt-[30px] md:mt-[50px]">
      {/* Tab Buttons */}
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm ${
              activeTab === index
                ? "border-[#5D5FEF] bg-[#5D5FEF] text-[#fff] rounded-[30px]"
                : "text-[#10375C] border-solid border-[1px] border-[#000] rounded-[30px]"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between mt-[16px]">
          <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap">
            <h3 className="text-lg font-RalewaySemiBold">Revenue Generated</h3>
            <DateFilter
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
          {tabs[activeTab]?.component}
        </div>
      </div>
    </div>
  );
};

export default TabbedInterface;
