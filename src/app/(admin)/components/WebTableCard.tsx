import React from "react";

// Define interfaces for our data structure
interface DailyEarnings {
  [date: string]: number;
}

interface User {
  userId: string;
  fullName: string;
  dailyEarnings: DailyEarnings;
}

interface WebTableCardProps {
  tabbingDataWeb: User[];
  isLoading?: boolean;
  error?: boolean;
}

const WebTableCard: React.FC<WebTableCardProps> = ({ tabbingDataWeb = [], isLoading = false, error = false }) => {
  // Get all unique dates from all users' dailyEarnings
  const getAllDates = (): string[] => {
    const dates = new Set<string>();
    tabbingDataWeb.forEach((user: User) => {
      if (user.dailyEarnings) {
        Object.keys(user.dailyEarnings).forEach(date => dates.add(date));
      }
    });
    return Array.from(dates).sort();
  };

  const dates = getAllDates();

  // Get earning for a specific date
  const getEarningForDate = (dailyEarnings: DailyEarnings, date: string): string | number => {
    return dailyEarnings[date] !== undefined ? dailyEarnings[date] : "-";
  };

  // Calculate total for each row (date)
  const calculateDateTotal = (date: string): number => {
  return tabbingDataWeb.reduce((total: number, user: User) => {
    const earning = getEarningForDate(user.dailyEarnings, date);
    return total + (typeof earning === "number" ? earning : 0);
  }, 0);
};

  // Calculate total for each user
  const calculateUserTotal = (dailyEarnings: DailyEarnings): number => {
    return Object.values(dailyEarnings || {}).reduce((sum: number, value: number) => sum + value, 0);
  };

  // Calculate grand total
  const calculateGrandTotal = (): number => {
    return tabbingDataWeb.reduce((total: number, user: User) => {
      return total + calculateUserTotal(user.dailyEarnings);
    }, 0);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (isLoading) {
    return (
      <div className="w-full flexp-8">
        <div className="">Loading...</div>
      </div>
    );
  } 
 
  if (!tabbingDataWeb.length || !dates.length) {
    return (
      <div className="table-common overflow-custom w-full sub-total-table">
          <p className="">No data found</p>
      </div>
    ); 
  } 
  
  if (error) {
    return (
      <div className="w-full flex  p-8"> 
        <div className="">Error loading Table data</div>
      </div>
    );
  } 

  return (
    <div className="table-common overflow-custom w-full sub-total-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {tabbingDataWeb.map((user: User) => (
              <th key={user.userId}>{user.fullName}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date: string) => (
            <tr key={`row-${date}`}>
              <td>{formatDate(date)}</td>
              {tabbingDataWeb.map((user: User) => (
                <td key={`${user.userId}-${date}`}>
                  {getEarningForDate(user.dailyEarnings, date) === "-" 
                    ? "-" 
                    : `$${getEarningForDate(user.dailyEarnings, date).toLocaleString()}`}
                </td>
              ))}
              <td>${calculateDateTotal(date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-[#5D5FEF] rounded-[10px] text-white">
            <td>Total</td>
            {tabbingDataWeb.map((user: User) => (
              <td key={`total-${user.userId}`}>
                ${calculateUserTotal(user.dailyEarnings).toLocaleString()}
              </td>
            ))}
            <td>${calculateGrandTotal().toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WebTableCard;