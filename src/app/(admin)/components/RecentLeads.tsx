"use client";
import { ButtonIcon, EditIcon, NextLabel, PreviousLabel } from "@/utils/svgicons";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

// Define the type for your project
interface Project {
  _id: string;
  clienttName: string;
  bidderName: string;
  platform: string;
  tech: string;
  contractType: string;
  emailAddress: string;
  phoneNumber: string;
  status: string;
  dateOflead: string;
  NoHours: string;
  NoRate: string,
  notes: string,

}

const RecentLeads: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      _id: "1",
      clienttName: "Justin Vaccaro",
      bidderName: "Varun Singh",
      platform: "Whatsapp",
      tech: "2024-Mobile Application",
      contractType: "Fixed",
      emailAddress: "alfonso@dummymail.com",
      phoneNumber: "+1 (555) 345-6789", 
      status: "In Discussion",
      dateOflead: "10 July 2024", 
      NoHours: "30",
      NoRate: "20",
      notes: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in",
    },
    {
      _id: "2",
      clienttName: "Marcus Septimus",
      bidderName: "Simran",
      platform: "Upwork",
      tech: "Web Development",
      contractType: "Hourly",
      emailAddress: "alfonso@dummymail.com",   
      phoneNumber: "+1 (555) 345-6789", 
      status: "Hired by Else",
      dateOflead: "24 July 2024",
      NoHours: "40",
      NoRate: "30",
      notes: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in",  
    },
    {
      _id: "3",
      clienttName: "Marcus Septimus",
      bidderName: "Simran",
      platform: "Upwork",
      tech: "Web Development",
      contractType: "Hourly",
      emailAddress: "alfonso@dummymail.com",   
      phoneNumber: "+1 (555) 345-6789", 
      status: "Hired",
      dateOflead: "24 July 2024",
      NoHours: "40",
      NoRate: "30",
      notes: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in",  
    },
    
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Explicitly typing the state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rowsPerPage = 12;
  const total = projects.length;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updatedProjects = projects.map((project) =>
      project._id === id ? { ...project, status: newStatus } : project
    );
    setProjects(updatedProjects);
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const displayedProjects = projects.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <>
      <div className="p-3 md:p-7 bg-white rounded-2xl flex items-center flex-col justify-between">
        <div className="w-full flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h3 className="text-[20px] font-RalewaySemiBold">Recent Leads</h3> 
          <a className="button-all" href="/record-new-lead"><ButtonIcon /> Record New Lead</a>
        </div>

        <div className="table-common overflow-custom w-full">
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
              {displayedProjects.length > 0 ? (
                displayedProjects.map((row) => (
                  <tr key={row._id}>
                    <td>{row.clienttName}</td>
                    <td>{row.bidderName}</td>
                    <td>{row.platform}</td>
                    <td>{row.tech}</td>
                    <td>{row.contractType}</td>
                    <td>{row.emailAddress}</td>
                    <td>
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-[#1C2329] text-[12px] ${
                          row.status === "In Discussion"
                            ? "bg-[#83E6F8]"
                            : row.status === "Hired by Else"
                            ? "bg-[#FF7476]"
                            : "bg-[#7AE071]"
                        }`}
                      >
                        <option value="In Discussion" className="text-black">
                          In Discussion
                        </option>
                        <option value="Hired by Else" className="text-black">
                          Hired by Else
                        </option>
                        <option value="Hired" className="text-black">
                          Hired
                        </option>
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
                ))
              ) : (
                <tr>
                  <td
                    className="w-full flex justify-center p-3 items-center"
                    colSpan={6}
                  >
                    <p className="text-center">No data found</p>
                  </td>
                </tr>
              )}
            </tbody>
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
            activeClassName={"!bg-[#1657FF] active rounded-full text-white"}
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

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-[20px] md:p-[40px] rounded-[20px] w-[94%] max-w-[850px] max-h-[94vh] overflow-y-auto">
            <div className="modal-header flex  justify-between gap-3 flex-col md:flex-row">
                <h2>{selectedProject.clienttName}</h2>
                <div className="">
                  <p>Bidder</p>
                  <h3> {selectedProject.bidderName}</h3>
                </div>
            </div>
            <div className="grid-box gap-3 mt-6">
               <div className="detail-card">
                 <p>Phone Number</p>
                 <h3>{selectedProject.phoneNumber}</h3>
               </div>
               <div className="detail-card">
                 <p>Email Address</p>
                 <h3>{selectedProject.emailAddress}</h3>
               </div>
            </div>
            <div className="grid-box gap-3">
               <div className="detail-card">
                 <p>Date of lead</p>
                 <h3>{selectedProject.dateOflead}</h3>
               </div>
               <div className="detail-card">
                 <p>Platform</p>
                 <h3>{selectedProject.platform}</h3>
               </div>
            </div>
            <div className="grid-box gap-3">
               <div className="detail-card">
                 <p>Technology</p>
                 <h3>{selectedProject.tech}</h3>
               </div>
               <div className="detail-card">
                 <p>Status</p>
                 <h3>{selectedProject.status}</h3>
               </div>
            </div>
            <div className="flex w-full gap-3">
               <div className="detail-card">
                 <p>Notes</p>
                 <p className="!text-[14px]">{selectedProject.notes}</p>
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
