"use client";
import { updateTargetModal } from "@/services/admin/admin-service";
import { useRouter } from "next/navigation";
import React, { FormEvent, ChangeEvent, useState, useEffect, useTransition } from "react";
import { toast } from "sonner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  total: any;
}
interface TargetUser {
  userId: string;
  fullName: string;
  targetAmount: number;
  technologyId: string;
  targetDate: string | null;
}

interface GroupedUsers {
  WebDevelopment?: TargetUser[];
  MERNDevelopment?: TargetUser[];
  MobileDevelopment?: TargetUser[];
  SeoDevelopment?: TargetUser[];
}

interface FormData {
  [teamName: string]: {
    totalTarget: string;
    members: {
      userId: string;
      fullName: string;
      target: string;
      technologyId: string;
      targetDate: string;
    }[];
  }; 
}

const EditTargetModal: React.FC<ModalProps> = ({ isOpen, onClose, data, total }) => {
  console.log('data:', data);
 
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});
  const [grandTotal, setGrandTotal] = useState<number>(0);

  const calculateTeamTotal = (members: { target: string }[]): string => {
    return members
      .reduce((sum, member) => sum + (parseFloat(member.target) || 0), 0)
      .toString();
  };

  // Calculate grand total across all teams
  const calculateGrandTotal = (data: FormData): number => {
    return Object.values(data).reduce((sum, team) => {
      return sum + parseFloat(calculateTeamTotal(team.members));
    }, 0);
  };


  useEffect(() => {
    if (data) {
      const initialFormState: FormData = {
        "Target for Web": {
          totalTarget: calculateTotalTarget(data?.WebDevelopment || []),
          members: (data?.WebDevelopment || []).map((user: any) => ({
            userId: user.userId,
            targetDate: user.targetDate,
            technologyId: user.technologyId,
            fullName: user.fullName,
            target: user.targetAmount.toString()
          }))
        },
        "Target for MERN": {
          totalTarget: calculateTotalTarget(data?.MERNDevelopment || []),
          members: (data?.MERNDevelopment || []).map((user: any) => ({
            userId: user.userId,
            targetDate: user.targetDate,
            technologyId: user.technologyId,
            fullName: user.fullName,
            target: user.targetAmount.toString()
          }))
        },
        "Target for Mobile": {
          totalTarget: calculateTotalTarget(data?.MobileDevelopment || []),
          members: (data?.MobileDevelopment || []).map((user: any) => ({
            userId: user.userId,
            targetDate: user.targetDate,
            technologyId: user.technologyId,
            fullName: user.fullName,
            target: user.targetAmount.toString()
          }))
        },
        "Target for SEO": {
          totalTarget: calculateTotalTarget(data?.SeoDevelopment || []),
          members: (data?.SeoDevelopment || []).map((user: any) => ({
            userId: user.userId,
            targetDate: user.targetDate,
            technologyId: user.technologyId,
            fullName: user.fullName,
            target: user.targetAmount.toString()
          }))
        }
      };
      setFormData(initialFormState);
      setGrandTotal(calculateGrandTotal(initialFormState));
    }
  }, [data]);

  const calculateTotalTarget = (users: TargetUser[]): any => {
    return users.reduce((sum, user) => sum + (user.targetAmount || 0), 0).toString();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    teamName: string,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    
    setFormData((prev: FormData) => {
      const updatedFormData = {
        ...prev,
        [teamName]: {
          ...prev[teamName],
          members: prev[teamName].members.map((member, i) => 
            i === index ? { ...member, target: value } : member
          )
        }
      };
      updatedFormData[teamName].totalTarget = calculateTeamTotal(updatedFormData[teamName].members);

      setGrandTotal(calculateGrandTotal(updatedFormData));
      
      return updatedFormData;
    });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
        const targets = Object.values(formData).flatMap(teamData => 
          teamData.members.map(member => ({
            userId: member.userId,
            technologyId: member.technologyId,
            targetDate: member.targetDate || new Date().toISOString(),
            targetAmount: parseFloat(member.target) || 0
          }))
        );
        const payload = { targets };
        console.log('payload:', payload);
  
        const response = await updateTargetModal("/admin/target", payload);
        console.log('response:', response);
      
        if (response.status === 200) { 
          toast.success("Targets updated successfully");
          //router.refresh();
          window.location.reload();  
          onClose();
        } else {
          toast.error("Failed to update targets");
        }
      } catch (error) {
        console.error("Error updating targets:", error);
        toast.error("An error occurred while updating the targets");
      }
  };
  
  const teamSections = [
    { key: "Target for Web", data: data?.WebDevelopment },
    { key: "Target for MERN", data: data?.MERNDevelopment },
    { key: "Target for Mobile", data: data?.MobileDevelopment },
    { key: "Target for SEO", data: data?.SeoDevelopment }
  ];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white py-[20px] px-[15px] md:p-[40px] rounded-lg w-[94%] max-w-[850px] shadow-lg max-h-[94vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#10375C]">
            Target December 2024
          </h3>
          <div className="bg-[#5D5FEF] text-[#fff] font-RalewayBold text-[18px] md:text-[22px] py-3 px-4 md:px-10 rounded-[10px]">
            ${total}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="fomm-wrapper">
          {teamSections.map((section, teamIndex) => {
            if (!section.data?.length) return null;
            
            return (
              <div key={teamIndex} className="mt-[15px] md:mt-[30px]">
                <h6 className="w-full text-[#1C2329] text-[16px] mb-2 font-RalewayMedium">
                  {section.key}
                </h6>
                <div className="flex gap-5">
                  <div className="w-full md:w-[calc(25%-5px)]">
                    <label className="block text-gray-700 mb-1">
                      Total Target
                    </label>
                    <p className="border rounded-[10px] px-3  py-[14px] w-full !border-[#5D5FEF] !text-[#5D5FEF]">
                    {`$${formData[section.key]?.totalTarget || ""}`}
                    </p>
                  </div>

                 <div className="flex w-full flex-wrap gap-3 ">
                 {section.data.map((user: any, memberIndex: any) => (
                    <div key={user.userId} className="w-[calc(50%-10px)] md:w-[calc(25%-10px)]">
                      <label className="block">{user.fullName}</label>
                      <input
                        type="text"
                        placeholder="Target"
                        value={`$${formData[section.key]?.members[memberIndex]?.target || ""}`}
                        onChange={(e) => handleInputChange(e, section.key, memberIndex)}
                        onFocus={(e) => {
                          e.target.value = formData[section.key]?.members[memberIndex]?.target || "";
                        }}
                        onBlur={(e) => {
                          e.target.value = `$${formData[section.key]?.members[memberIndex]?.target || ""}`;
                        }}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </div>
                  ))}
                 </div>
                </div>
              </div>
            );
          })}

          <div className="flex w-full justify-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="mt-6 bg-[#fff] border-solid border-[1px] border-[#5D5FEF] text-[#5D5FEF] px-8 py-4 w-full max-w-[184px] rounded-full text-[14px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="mt-6 bg-[#5D5FEF] border-solid border-[1px] border-[#5D5FEF] text-white px-8 py-4 w-full max-w-[184px] rounded-full text-[14px]"
            >
              {isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTargetModal;
