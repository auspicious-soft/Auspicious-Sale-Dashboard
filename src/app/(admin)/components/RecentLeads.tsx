"use client";
import { dashboradPage, getLeadStatus, updateLeadStatus } from "@/services/admin/admin-service";
import { ButtonIcon, EditIcon } from "@/utils/svgicons";
import React, { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const RecentLeads: React.FC = () => {
  const [query, setQuery] = useState("page=1&limit=10");
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/dashboard?${query}`,
    dashboradPage
  );
  const dashboardData = data?.data?.data;
  const tabledata = dashboardData?.recentProjectDetails;

  const { data: getLeadStatusdata } = useSWR("/admin/status", getLeadStatus);
  const getLeadStatusData = getLeadStatusdata?.data?.data;

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    const selectedStatus = getLeadStatusData?.status.find(
      (status: any) => status.name === e.target.value
    );

    if (!selectedStatus) {
      toast.error("Invalid status selected");
      return;
    }

    try {
      const response = await updateLeadStatus(`/admin/lead/${id}`, {
        statusId: selectedStatus._id,
      });
      if (response.status === 200) {
        toast.success("Status updated successfully");
        mutate();
        window.location.reload();  
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const openModal = (row: any) => {
    setSelectedProject(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between">
        <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h3 className="text-[20px] font-RalewaySemiBold">Recent Leads</h3>
          <a className="button-all" href="/record-new-lead">
            <ButtonIcon /> Record New Lead
          </a>
        </div>

        <div className="table-common overflow-custom w-full">
          {isLoading ? (
            <p className="">Loading...</p> // Show loading message
          ) : tabledata?.length === 0 ? (
            <p className="'">No data found</p> // Show no data message
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name of Client</th>
                  <th>Name of Bidder</th>
                  <th>Platform</th>
                  <th>Tech</th>
                  <th>Contract Type</th>
                  <th>Email Address</th>
                  <th>Status</th>
                  <th>
                    <div className="flex justify-center gap-[6px]">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabledata?.map((row: any) => (
                  <tr key={row?._id}>
                    <td>{row?.clientname}</td>
                    <td>{row?.userId.fullName}</td>
                    <td>{row?.platform.name}</td>
                    <td>{row?.technology.name}</td>
                    <td>{row?.contracttype}</td>
                    <td>{row?.clientemail}</td>
                    <td>
                      <select
                        value={row?.statusId.name}
                        onChange={(e) => handleInputChange(e, row?._id)}
                        className={`px-2 py-1 rounded-full text-[#1C2329] text-[12px] ${
                          row?.statusId.name === "In Discussion"
                            ? "bg-[#83E6F8]"
                            : row?.statusId.name === "Hired by Else"
                            ? "bg-[#FF7476]"
                            : "bg-[#7AE071]"
                        }`}
                      >
                        {getLeadStatusData?.status?.length > 0 ? (
                          getLeadStatusData.status.map((status: any) => (
                            <option key={status._id} value={status.name} className="text-black">
                              {status.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No Status Available
                          </option>
                        )}
                      </select>
                    </td>
                    <td>
                      <div className="flex justify-center gap-[6px]">
                        <button onClick={() => openModal(row)}>
                          <EditIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-[20px] md:p-[40px] rounded-[20px] w-[94%] max-w-[850px] max-h-[94vh] overflow-y-auto">
            <div className="modal-header flex justify-between gap-3 flex-col md:flex-row">
              <h2>{selectedProject?.clientname}</h2>
              <div>
                <p>Bidder</p>
                <h3>{selectedProject?.userId.fullName}</h3>
              </div>
            </div>
            <div className="grid-box gap-3 mt-6">
              <div className="detail-card">
                <p>Phone Number</p>
                <h3>{selectedProject?.clientphone}</h3>
              </div>
              <div className="detail-card">
                <p>Email Address</p>
                <h3 className="!lowercase">{selectedProject?.clientemail}</h3>
              </div>
            </div>
            
            <div className="grid-box gap-3">
               <div className="detail-card">
                 <p>Date of lead</p>
                 <h3>{selectedProject?.date}</h3>
               </div>
               <div className="detail-card">
                 <p>Platform</p>
                 <h3>{selectedProject?.platform.name}</h3>
               </div>
            </div>
            <div className="grid-box gap-3">
               <div className="detail-card">
                 <p>Technology</p>
                 <h3>{selectedProject?.technology.name}</h3>
               </div>
               <div className="detail-card">
                 <p>Status</p>
                 <h3>{selectedProject?.statusId.name}</h3>
               </div>
            </div>
            <div className="grid-box gap-3">
               <div className="detail-card">
                 <p>Contract  Type</p>
                 <h3>{selectedProject?.contracttype}</h3>
               </div>
               <div className="detail-card">
                  
                  {selectedProject?.contracttype === "Hourly" ? (
                    <>
                    <p>No of hours and rate</p>
                    <h3>${selectedProject?.costperhour}/hour for {selectedProject?.noofhours} hours</h3>
                    </>
                  ) : (
                    <>
                    <p>Fixed Price</p>
                    <h3>${selectedProject?.fixedprice}</h3>
                    </>
                  )}
                </div>
            </div>
            <div className="flex w-full gap-3">
               <div className="detail-card">
                 <p>Notes</p>
                 <p className="!text-[14px]">{selectedProject?.notes}</p>
               </div>
            </div>
            

            <div className="flex w-full justify-center gap-3">
              <button
                onClick={closeModal}
                className="mt-6 bg-[#5D5FEF] text-white px-8 py-4 w-full max-w-[184px] rounded-full text-[14px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentLeads;
