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
import { createBidStatus, dashboradPage, updateBidStatus } from "@/services/admin/admin-service";
import useSWR from "swr";
import { toast } from "sonner";
 
const OverViewSection: React.FC = () => {
  const [ isPending ,startTransition] = useTransition();
  const [editedAmount, setEditedAmount] = useState<number | null>(0);
  const [isEditingBids, setIsEditingBids] = useState(false);  
  const [isEditingAmount, setIsEditingAmount] = useState(false);  
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());  

  const { data, error, isLoading, mutate } = useSWR( "/admin/dashboard", dashboradPage);

  const dashboardData = data?.data?.data;
  console.log('dashboardData:', dashboardData);

  
  useEffect(() => {
    if (!isEditingAmount) {
      setEditedAmount(null);
    }
  }, [isEditingAmount]);


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
        // PATCH request
        response = await updateBidStatus(`/admin/bid/${id}`, actionData);
        
        // Check for successful update (200)
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
          });
          
          toast.success("Bid status updated successfully");
        } else {
          throw new Error("Update failed");
        }
      } else {
        // POST request
        response = await createBidStatus('/admin/bid', actionData);
        
        // Check for successful creation (201)
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
      await mutate(); // Refetch to ensure server sync
      
    } catch (error) {
      console.error("Error:", error);
      toast.error(isEditingAmount ? "Error updating bid status" : "Error creating bid status");
      await mutate(); // Refetch to revert to server state
    }
  };

  const maxDate = dayjs(); 
  const minDate = dayjs().subtract(20, "year"); 

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
        value={editedAmount ?? dashboardData?.bidsThisMonths?.amount ?? 0}
        onChange={(e) => setEditedAmount(Number(e.target.value))}
        onBlur={handleSaveAmount}  
        disabled={isPending}
        className="border border-gray-300 rounded p-1 w-[80px] min-h-[50px] text-[20px] font-RalewaySemiBold text-[#10375C]"
      />
    ) : (
      <span className="font-RalewaySemiBold text-[26px] md:text-[40px] text-[#10375C]">
        {dashboardData?.bidsThisMonths?.amount ?? 0}
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
            {dashboardData?.totalresponses}
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
