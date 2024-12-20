"use client";
import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import Notification from "../components/Notification";
import { SubmitButton } from "@/utils/svgicons";
import CustomSelect from "@/app/(website)/components/CustomSelect";

const bidderName = [
    { label: "Simran", value: "Simran" },
    { label: "Annu", value: "Annu" },
    { label: "Pardeep", value: "Pardeep" },
    { label: "Yogesh", value: "Yogesh" }, 
    { label: "Gurpreet", value: "Gurpreet" },
];
const platformName = [
    { label: "Whatsapp", value: "Whatsapp" },
    { label: "Upwork", value: "Upwork" }, 
];
const technology = [
    { label: "Web Development", value: "Web Development" },
    { label: "Mobile Application", value: "Mobile Application" },
    { label: "Web Development", value: "Web Development" }, 
]; 
const status = [
    { label: "In Discussion", value: "In Discussion" },
    { label: "Hired By Else", value: "Hired By Else" },
    { label: "Hired", value: "Hired" },  
]; 
const contractType = [
    { label: "Hourly", value: "Hourly" },
    { label: "Fixed", value: "Fixed" },
]; 

const AddNewLead:React.FC = () => {
    // console.log('data:', data);
  const [notification, setNotification] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedBidder, setSelectedBidder] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null); 
  const [selectedContractType, setsetSelectedContractType] = useState<any>(null); 

  const [formData, setFormData] = useState<any>({
    clientName: "",
    projectimageLink: "",
    projectstartDate: "",
    projectendDate: "",
    assignCustomer: "",
    description: "",
    noHours: "",
    costHours: "",
    emailAddress:"",
    phoneNumber: "",
    status: "",
  });
  const handleContractType= (selected: any) => {
    setsetSelectedContractType(selected);
    // Set the userId when a user is selected
    setFormData((prev: any) => ({
      ...prev,
      userId: selected ? selected.id : ""
    }));
  };
  const handleStatusChange= (selected: any) => {
    setSelectedStatus(selected);
    // Set the userId when a user is selected
    setFormData((prev: any) => ({
      ...prev,
      userId: selected ? selected.id : ""
    }));
  };
  const handleTechnologyChange= (selected: any) => {
    setSelectedTechnology(selected);
    // Set the userId when a user is selected
    setFormData((prev: any) => ({
      ...prev,
      userId: selected ? selected.id : ""
    }));
  };
  const handlePlatformChange= (selected: any) => {
    setSelectedPlatform(selected);
    // Set the userId when a user is selected
    setFormData((prev: any) => ({
      ...prev,
      userId: selected ? selected.id : ""
    }));
  };
  const handleBidderChange= (selected: any) => {
    setSelectedBidder(selected);
    // Set the userId when a user is selected
    setFormData((prev: any) => ({
      ...prev,
      userId: selected ? selected.id : ""
    }));
  };
  const handleUserChange = (selected: any) => {
    setSelectedUser(selected);
    // Set the userId when a user is selected
    setFormData((prev: any) => ({
      ...prev,
      userId: selected ? selected.id : ""
    }));
  };

 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value, // Update the specific field by name
    }));
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
  };


  return (
  <div>
        <div className="">
        <form onSubmit={handleSubmit} className="fomm-wrapper">
          <div className="grid md:flex flex-wrap gap-[20px] relative bg-white rounded-[20px] mb-[20px] md:rounded-[20px] w-full py-[20px] px-[15px] md:px-[28px]">
          <h2 className="section-projectName w-full font-RalewaySemiBold">Record a new lead</h2>
            <div className="md:w-[calc(66.66%-10px)]">
              <label className="block">Name of client</label>
              <input
                type="text"
                name="clientName" 
                value={formData.clientName}
                placeholder="Name of client" 
                onChange={handleInputChange}
              />
            </div>
            <div className="md:w-[calc(33.33%-10px)]">
                <label className="block">Name of bidder</label>
                <CustomSelect
                value={selectedBidder}
                options={bidderName} 
                onChange={handleBidderChange}
                placeholder="Name of bidder"
              />
            </div>
            <div className="md:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]">
              <label className="block">Date of lead</label>
              <input
                type="date"
                name="projectstartDate"
                value={formData.projectstartDate}
                onChange={handleInputChange}
                placeholder="+12346987"
              /> 
            </div>
            <div className="md:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]">
              <label className="block">Platform</label>
              <CustomSelect
                value={selectedPlatform}
                options={platformName} 
                onChange={handlePlatformChange}
                placeholder="Select Platform"
              />
            </div>
            <div className="md:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]">
              <label className="block">Select technology</label>
              <CustomSelect
                value={selectedTechnology}
                options={technology} 
                onChange={handleTechnologyChange}
                placeholder="Select technology"
              />
            </div>
            <div className="md:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]">
              <label className="block">Status</label>
              <CustomSelect
                value={selectedStatus}
                options={status} 
                onChange={handleStatusChange}
                placeholder="Select Status"
              />
            </div>

            <div className="w-full">
              <label className="block">Extra Notes</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Type Notes" 
              >
              </textarea>
            </div>
          </div>

          <div className="grid md:flex flex-wrap gap-[20px] relative bg-white rounded-[20px] mb-[20px] md:rounded-[20px] w-full py-[20px] px-[15px] md:px-[28px]">
            <h2 className="section-projectName w-full font-RalewaySemiBold">Cost Details</h2>
            <div className="md:w-[calc(33.33%-15px)]">
                <label className="block">Contract Type</label>
                <CustomSelect
                value={selectedContractType}
                options={contractType}
                onChange={handleContractType}
                placeholder="Contract Type"
              />
            </div>
            <div className="md:w-[calc(33.333%-15px)]">
              <label className="block">No of Hours</label>
              <input
                type="number"
                name="noHours" 
                value={formData.noHours}
                placeholder="No of Hours" 
                onChange={handleInputChange}
              />
            </div>
            <div className="md:w-[calc(33.333%-15px)]">
              <label className="block">Cost per hour</label>
              <input
                type="number"
                name="costHours" 
                value={formData.costHours}
                placeholder="Cost per hour" 
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid md:flex flex-wrap gap-[20px] relative bg-white rounded-[20px] mb-[20px] md:rounded-[20px] w-full py-[20px] px-[15px] md:px-[28px]">
            <h2 className="section-projectName w-full font-RalewaySemiBold">Client details</h2>
            <div className="md:w-[calc(33.333%-15px)]">
              <label className="block">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber" 
                value={formData.phoneNumber}
                placeholder="Phone Number" 
                onChange={handleInputChange} 
              />
            </div>
            <div className="md:w-[calc(33.333%-15px)]">
              <label className="block">Email Address</label>
              <input
                type="email"
                name="emailAddress" 
                value={formData.emailAddress}
                placeholder="Email Address" 
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end ">
            <button
              type="submit"
              className="button w-full max-w-[150px]"
              disabled={isPending}
            >
              {" "}
              <SubmitButton />
              {isPending ? "Updating..." : "Save Details"}
            </button>
          </div>
        </form>
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      </div>   
  </div> 
  ); 
};
export default AddNewLead;
