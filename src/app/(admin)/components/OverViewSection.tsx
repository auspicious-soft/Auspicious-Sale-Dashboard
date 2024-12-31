"use client";
import React, { useEffect, useState, useTransition } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  BidSaveIcon,
  EarningsIcon,
  EditBid,
  ProjectHireIcon,
  ResponsesIcon,
  SubmitButton,
  TotalBids,
} from "@/utils/svgicons";
import { createBidStatus, dashboardOverview, updateBidStatus } from "@/services/admin/admin-service";
import useSWR from "swr";
import { toast } from "sonner";

const OverViewSection: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [editedAmount, setEditedAmount] = useState<number | null>(0);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  // Create the API URL with month and year parameters
  const getApiUrl = (date: Dayjs | null) => {
    if (!date) return null;
    const month = date.month() + 1; // dayjs months are 0-indexed
    const year = date.year();
    return `/admin/dashboardOverviewstat?month=${month}&year=${year}`;
  };

  // Use the constructed URL in the SWR hook
  const { data, error, isLoading, mutate } = useSWR(
    getApiUrl(selectedDate),
    dashboardOverview,
    {
      revalidateOnFocus: false,
    }
  );

  const dashboardData = data?.data?.data;

  useEffect(() => {
    if (!isEditingAmount) {
      setEditedAmount(null);
    }
  }, [isEditingAmount]);

  // Handle date changes
  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    // The SWR hook will automatically refetch with the new URL
  };

  const handleSaveAmount = async () => {
    const finalAmount = editedAmount ?? dashboardData?.bidsThisMonth?.amount ?? 0;
    const id = dashboardData?.bidsThisMonth?._id;
    
    const actionData = {
      amount: finalAmount,
      date: selectedDate?.format('YYYY-MM-DD')
    };

    try {
      const existingAmount = dashboardData?.bidsThisMonth?.amount;
      let response: any;

      if (existingAmount && id) {
        response = await updateBidStatus(`/admin/bid/${id}`, actionData);
        
        if (response.status === 200) {
          startTransition(() => {
            const updatedData = {
              ...dashboardData,
              bidsThisMonth: {
                ...dashboardData?.bidsThisMonth,
                amount: finalAmount
              }
            };
            mutate(updatedData, false);
            // window.location.reload();  
          });
          
          toast.success("Bid status updated successfully");
        } else {
          throw new Error("Update failed"); 
        }
      } else {
        response = await createBidStatus('/admin/bid', actionData);
        
        if (response.status === 201) {
          startTransition(() => {
            const updatedData = {
              ...dashboardData,
              bidsThisMonth: {
                _id: response.data?._id,
                amount: finalAmount,
                date: selectedDate?.format('YYYY-MM-DD')
              }
            };
            mutate(updatedData, false);
          });
          
          toast.success("Bid status created successfully");
        } else {
          throw new Error("Creation failed");
        }
      }

      setIsEditingAmount(false);
      await mutate();
      
    } catch (error) {
      console.error("Error:", error);
      toast.error(isEditingAmount ? "Error updating bid status" : "Error creating bid status");
      await mutate();
    }
  };

  const maxDate = dayjs();
  const minDate = dayjs().subtract(20, "year");

  // Loading state
  if (isLoading) {
    return <div className="p-7 bg-white rounded-2xl">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="p-7 bg-white rounded-2xl">Error loading dashboard data</div>;
  }

  return (
    <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between">
      <div className="w-full flex items-center justify-between gap-4 mb-10 flex-wrap">
        <h3 className="text-[20px] font-RalewaySemiBold">Overview</h3>
        <div className="flex items-center gap-4 max-w-[270px]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Month"
              openTo="month"
              views={["month"]}
              value={selectedDate}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "12px",
                  padding: "12px 10px",
                },
              }}
            />
            <DatePicker
              className="border-[#000] input-custom"
              label="Year"
              openTo="year"
              views={["year"]}
              value={selectedDate}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
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
        <div className="cursor-pointer">
          <div className="flex items-center gap-[10px] md:gap-[20px] relative">
            <span
              className="cursor-pointer absolute right-[-15px] top-[-15px]"
              onClick={isEditingAmount ? handleSaveAmount : () => setIsEditingAmount(true)}
            >
              {isEditingAmount ? (
                <button 
                  onClick={handleSaveAmount} 
                  className=""
                  disabled={isPending}
                >
                  {isPending ? 'Saving...' : <BidSaveIcon/>}
                </button>
              ) : (
                <EditBid />
              )}
            </span>
            <div className="relative top-[2px]">
              <TotalBids />
            </div>
            {isEditingAmount ? (
              <input
                type="number"
                value={editedAmount ?? dashboardData?.bidsThisMonth?.amount ?? 0}
                onChange={(e) => setEditedAmount(Number(e.target.value))}
                onBlur={handleSaveAmount}  
                disabled={isPending}
                className="border border-gray-300 rounded p-1 w-[80px] min-h-[50px] text-[20px] font-RalewaySemiBold text-[#10375C]"
              />
            ) : (
              <span className="font-RalewaySemiBold text-[26px] md:text-[40px] text-[#10375C]">
                {dashboardData?.bidsThisMonth?.amount ?? 0}
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
              {dashboardData?.totalresponses ?? 0}
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
              {dashboardData?.projecthired ?? 0}
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
              {dashboardData?.totalEarnings ?? 0}
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