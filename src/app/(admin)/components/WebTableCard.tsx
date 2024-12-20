"use client";
import { NextLabel, PreviousLabel } from "@/utils/svgicons";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Define the type for your project
interface Project {
  _id: string;
  webBidderOne: string;
  webBidderTwo: string;
  webBidderThree: string;
}

const WebTableCard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()); // Allow null
     // Define min and max dates to restrict the year range
     const maxDate = dayjs(); // Current date
     const minDate = dayjs().subtract(20, "year"); // One year in the past
  const [projects, setProjects] = useState<Project[]>([
    {
      _id: "1",
      webBidderOne: "$10",
      webBidderTwo: "$15",
      webBidderThree: "$5",
    },
    {
      _id: "2",
      webBidderOne: "$20",
      webBidderTwo: "$25",
      webBidderThree: "$10",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 12;
  const total = projects.length;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const displayedProjects = projects.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const parseAmount = (amount: string) => parseFloat(amount.replace('$', '').trim()) || 0;

  // Calculate row total for each project
  const calculateRowTotal = (project: Project) => {
    return parseAmount(project.webBidderOne) + parseAmount(project.webBidderTwo) + parseAmount(project.webBidderThree);
  };

  // Calculate the grand total for all projects
  const calculateGrandTotal = (projects: Project[]) => {
    return projects.reduce((acc, project) => acc + calculateRowTotal(project), 0);
  };

  // Calculate the grid total for each column
  const calculateGridTotal = (projects: Project[], columnIndex: number) => {
    return projects.reduce((acc, project) => {
      const amount = [project.webBidderOne, project.webBidderTwo, project.webBidderThree][columnIndex];
      return acc + parseAmount(amount);
    }, 0);
  };
   

  return (
    <>
      <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between mt-[16px]">
        <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h3 className="text-lg font-RalewaySemiBold">Revenue Generated</h3>
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

        <div className="table-common overflow-custom w-full sub-total-table">
          <table>
            <thead>
              <tr>
                <th>Pardeep Singh</th>
                <th>Annu</th>
                <th>Simran</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.length > 0 ? (
                displayedProjects.map((row) => (
                  <tr key={row._id}>
                    <td>{row.webBidderOne}</td>
                    <td>{row.webBidderTwo}</td>
                    <td>{row.webBidderThree}</td>
                    <td>{`$${calculateRowTotal(row).toFixed(2)}`}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="w-full flex justify-center p-3 items-center" colSpan={8}>
                    <p className="text-center">No data found</p>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot >
              <tr className="bg-[#5D5FEF] rounded-[10px]">
                <td>{`$${calculateGridTotal(projects, 0).toFixed(2)}`}</td>
                <td>{`$${calculateGridTotal(projects, 1).toFixed(2)}`}</td>
                <td>{`$${calculateGridTotal(projects, 2).toFixed(2)}`}</td>
                <td>{`$${calculateGrandTotal(projects).toFixed(2)}`}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="text-right mt-4 w-full">
          <ReactPaginate
            previousLabel={<PreviousLabel />}
            nextLabel={<NextLabel />}
            breakLabel={"..."}
            pageCount={Math.ceil(total / rowsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"inline-flex mt-[34px] gap-1"}
            pageClassName={
              "text-[#3C3F88] border border-{#F1F1F1} bg-white rounded-full"
            }
            pageLinkClassName={
              "grid place-items-center h-10 w-10 inline-block"
            }
            activeClassName={"!bg-[#5D5FEF] active rounded-full text-white"}
            previousClassName={"leading-[normal]"}
            previousLinkClassName={
              "grid place-items-center h-10 w-10 inline-block border border-{#F1F1F1} bg-white rounded-full"
            }
            nextLinkClassName={
              "grid place-items-center h-10 w-10 inline-block border border-{#F1F1F1} bg-white rounded-full"
            }
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
      </div>

      {/* Modal code here */}
    </>
  );
};

export default WebTableCard;
