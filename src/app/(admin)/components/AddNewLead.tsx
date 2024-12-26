"use client";
import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import Notification from "../components/Notification";
import { SubmitButton } from "@/utils/svgicons";
import CustomSelect from "@/app/(website)/components/CustomSelect";
import {
  createGetLeadServices,
  createNewLead,
} from "@/services/admin/admin-service";
import useSWR from "swr";
import { toast } from "sonner";

const contractType = [
  { label: "Hourly", value: "Hourly" },
  { label: "Fixed", value: "Fixed" },
];

const AddNewLead: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedBidder, setSelectedBidder] = useState<any>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [selectedContractType, setSelectedContractType] = useState<any>(null);

  const { data, error, isLoading, mutate } = useSWR(
    `/admin/lead-data`,
    createGetLeadServices
  );

  const createLeadusers = data?.data?.data?.users;
  const bidders =
    createLeadusers?.map((user: any) => ({
      label: `${user?.fullName}`,
      value: `${user?._id}`,
    })) || [];

  const createLeadPlatform = data?.data?.data?.platform;
  const platform =
    createLeadPlatform?.map((platform: any) => ({
      label: `${platform?.name}`,
      value: `${platform?._id}`,
    })) || [];

  const createLeadTechnology = data?.data?.data?.technology;
  const technology =
    createLeadTechnology?.map((technology: any) => ({
      label: `${technology?.name}`,
      value: `${technology?._id}`,
    })) || [];

  const createLeadStatus = data?.data?.data?.status;
  const status =
    createLeadStatus?.map((status: any) => ({
      label: `${status?.name}`,
      value: `${status?._id}`,
    })) || [];

  const [formData, setFormData] = useState<any>({
    clientname: "",
    clientemail: "",
    clientphone: "",
    userId: "",
    date: "",
    platform: "",
    technology: "",
    statusId: "",
    notes: "",
    contracttype: "",
    fixedprice: "",
    noofhours: "",
    costperhour: "",
  });

  const handleContractType = (selected: any) => {
    setSelectedContractType(selected);
    setFormData({
      ...formData,
      contracttype: selected.value,
    });
  };

  const handleStatusChange = (selected: any) => {
    setSelectedStatus(selected);
    setFormData({
      ...formData,
      statusId: selected.value,
    });
  };

  const handleTechnologyChange = (selected: any) => {
    setSelectedTechnology(selected);
    setFormData({
      ...formData,
      technology: selected.value,
    });
  };

  const handlePlatformChange = (selected: any) => {
    setSelectedPlatform(selected);
    setFormData({
      ...formData,
      platform: selected.value,
    });
  };

  const handleBidderChange = (selected: any) => {
    setSelectedBidder(selected);
    setFormData({
      ...formData,
      userId: selected.value,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create payload based on contract type
    const payload = {
      clientname: formData.clientname,
      clientemail: formData.clientemail,
      clientphone: formData.clientphone,
      userId: formData.userId,
      date: formData.date,
      platform: formData.platform,
      technology: formData.technology,
      statusId: formData.statusId,
      notes: formData.notes,
      contracttype: formData.contracttype,
      fixedprice: formData.fixedprice,
      noofhours: formData.noofhours,
      costperhour: formData.costperhour,

    };
    try {
      const response = await createNewLead(`/admin/lead`, payload);
      if (response.status === 201) {
        toast.success("Lead added successfully");
        mutate();
        // Reset form
        setFormData({
          clientname: "",
          clientemail: "",
          clientphone: "",
          userId: "",
          date: "",
          platform: "",
          technology: "",
          statusId: "",
          notes: "",
          contracttype: "",
          fixedprice: "",
          noofhours: "",
          costperhour: "",
        });
        setSelectedBidder(null);
        setSelectedPlatform(null);
        setSelectedTechnology(null);
        setSelectedStatus(null);
        setSelectedContractType(null);
      } else {
        toast.error("Failed to add lead");
      }
    } catch (error) {
      console.error("Error adding lead", error);
      toast.error("An error occurred while adding the lead");
    }
  };

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit} className="fomm-wrapper">
          <div className="grid md:flex flex-wrap gap-[20px] relative bg-white rounded-[20px] mb-[20px] md:rounded-[20px] w-full py-[20px] px-[15px] md:px-[28px]">
            <h2 className="section-projectName w-full font-RalewaySemiBold">
              Record a new lead
            </h2>
            <div className="md:w-[calc(66.66%-10px)]">
              <label className="block">Name of client</label>
              <input
                type="text"
                name="clientname"
                value={formData.clientname}
                placeholder="Name of client"
                onChange={handleInputChange}
              />
            </div>
            <div className="md:w-[calc(33.33%-10px)]">
              <label className="block">Name of bidder</label>
              <CustomSelect
                value={selectedBidder}
                options={bidders}
                onChange={handleBidderChange}
                placeholder="Name of bidder"
              />
            </div>
            <div className="md:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]">
              <label className="block">Date of lead</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="+12346987"
              />
            </div>
            <div className="md:w-[calc(50%-15px)] lg:w-[calc(25%-15px)]">
              <label className="block">Platform</label>
              <CustomSelect
                value={selectedPlatform}
                options={platform}
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
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Type Notes"
              ></textarea>
            </div>
          </div>

          <div className="grid md:flex flex-wrap gap-[20px] relative bg-white rounded-[20px] mb-[20px] md:rounded-[20px] w-full py-[20px] px-[15px] md:px-[28px]">
            <h2 className="section-projectName w-full font-RalewaySemiBold">
              Cost Details
            </h2>
            <div className="md:w-[calc(33.33%-15px)]">
              <label className="block">Contract Type</label>
              <CustomSelect
                value={selectedContractType}
                options={contractType}
                onChange={handleContractType}
                placeholder="Contract Type"
              />
            </div>
            {selectedContractType?.value === "Hourly" && (
              <>
                <div className="md:w-[calc(33.333%-15px)]">
                  <label className="block">No of Hours</label>
                  <input
                    type="number"
                    name="noofhours"
                    value={formData.noofhours}
                    placeholder="No of Hours"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:w-[calc(33.333%-15px)]">
                  <label className="block">Cost per hour</label>
                  <input
                    type="number"
                    name="costperhour"
                    value={formData.costperhour}
                    placeholder="Cost per hour"
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            {selectedContractType?.value === "Fixed" && (
              <div className="md:w-[calc(33.333%-15px)]">
                <label className="block">Fixed Price</label>
                <input
                  type="number"
                  name="fixedprice"
                  value={formData.fixedprice}
                  placeholder="Cost per hour"
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="grid md:flex flex-wrap gap-[20px] relative bg-white rounded-[20px] mb-[20px] md:rounded-[20px] w-full py-[20px] px-[15px] md:px-[28px]">
            <h2 className="section-projectName w-full font-RalewaySemiBold">
              Client details
            </h2>
            <div className="md:w-[calc(33.333%-15px)]">
              <label className="block">Phone Number</label>
              <input
                type="tel"
                name="clientphone"
                value={formData.clientphone}
                placeholder="Phone Number"
                onChange={handleInputChange}
              />
            </div>
            <div className="md:w-[calc(33.333%-15px)]">
              <label className="block">Email Address</label>
              <input
                type="email"
                name="clientemail"
                value={formData.clientemail}
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
