"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StatisticsChart from '../components/StatisticsChart';
import { dashboradPage } from "@/services/admin/admin-service";
import useSWR from 'swr'; 

const Home: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Allow null
    const {data, error , isLoading, mutate} = useSWR('/admin/dashboard', dashboradPage)

    const dashboardData= data?.data?.data
    const bidsThisMonth = Array.isArray(dashboardData?.bidsThisMonths) ? dashboardData.bidsThisMonths : [];
    const amount = dashboardData?.bidsThisMonths?.amount ?? 0; 
    const handleSave = () => {
      setIsEditing(false); // Exit edit mode
    };
  
    // Define min and max dates to restrict the year range
    const maxDate = dayjs(); // Current date
    const minDate = dayjs().subtract(20, "year"); // One year in the past
  return (
    <div className="flex flex-col pt-[20px] pb-[30px] md:pb-[50px]">
      <div className="w-full max-w-[540px] border-solid border-[1px] border-[#5D5FEF] rounded-[20px] py-[25px] px-[15px]  md:px-[30px]">
    
      <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap ">
        <h3 className="text-[20px] font-RalewaySemiBold">Statistics</h3>
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
                '& .MuiOutlinedInput-input': {
                  fontSize: '12px',
                  padding: '12px 10px',
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
                '& .MuiOutlinedInput-input': {
                  fontSize: '12px',
                  padding: '12px 10px',
                },
              }}
            />
           
          </LocalizationProvider>
        </div>
      </div>

        <div className="flex items-center justify-center gap-[15px] md:gap-[50px] ">
        <StatisticsChart 
  amount={Number(amount)}
  responseRate={dashboardData?.responserate || 0} 
  hiringRate={dashboardData?.hiringrate || 0}
/>
          <div>
            <div className="flex flex-col gap-1 mb-[20px]">
                <h3 className='text-[#10375C] text-[30px] font-RalewaySemiBold'>{Math.round(dashboardData?.responserate || 0)}%</h3>
                <div className="flex items-center gap-2">
              <span 
                className="w-[16px] h-[10px] inline-block rounded-[18px]"
                style={{ backgroundColor: '#7AE071' }}
              ></span>
              <span className="text-[12px] text-[#1C2329] font-RalewayMedium"> Response rate</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
            <h3 className='text-[#10375C] text-[30px] font-RalewaySemiBold'>{Math.round(dashboardData?.hiringrate || 0)}%</h3> 
            <div className="flex items-center gap-2">
            <span 
            className="w-[16px] h-[10px] inline-block rounded-[18px]"
                style={{ backgroundColor: '#FD5602' }}
              ></span>
              <span className="text-[12px] text-[#1C2329] font-RalewayMedium"> Hiring rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
