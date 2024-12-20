"use client";
import React, { FormEvent, ChangeEvent, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Team {
  teamName: string;
  members: string[];
}

interface FormData {
  [teamName: string]: {
    totalTarget: string;
    members: string[];
  };
}

const EditTargetModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const initialTeams: Team[] = [
    {
      teamName: "Target for Web",
      members: ["Pardeep Singh", "Pardeep Singh", "Pardeep Singh"],
    },
    { teamName: "Target for MERN", members: ["Ravi Kumar", "Ajay Mehra"] },
    { teamName: "Target for Mobile", members: ["Suresh Kumar", "John Doe"] },
    {
      teamName: "Target for SEO",
      members: ["Anil Gupta", "Kunal Singh", "Sara Lee"],
    },
  ];

  const [formData, setFormData] = useState<FormData>(() => {
    const initialFormState: FormData = {};
    initialTeams.forEach((team) => {
      initialFormState[team.teamName] = {
        totalTarget: "",
        members: team.members.map(() => ""),
      };
    });
    return initialFormState;
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    teamName: string,
    index?: number
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => {
      if (name === "totalTarget") {
        return {
          ...prev,
          [teamName]: {
            ...prev[teamName],
            totalTarget: value,
          },
        };
      } else if (index !== undefined) {
        const updatedMembers = [...prev[teamName].members];
        updatedMembers[index] = value;
        return {
          ...prev,
          [teamName]: {
            ...prev[teamName],
            members: updatedMembers,
          },
        };
      }
      return prev;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white py-[20px] px-[15px] md:p-[40px] rounded-lg w-[94%] max-w-[850px] shadow-lg max-h-[94vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#10375C]">
            Target December 2024
          </h3>
          <div className="bg-[#5D5FEF] text-[#fff] font-RalewayBold text-[18px] md:text-[22px] py-3 px-4 md:px-10 rounded-[10px]">
            $12,400
          </div>
        </div>

        <form onSubmit={handleSubmit} className="fomm-wrapper">
          {initialTeams.map((team, teamIndex) => (
            <div key={teamIndex} className="mt-[15px] md:mt-[30px]">
              <h6 className="w-full text-[#1C2329] text-[16px] mb-2 font-RalewayMedium">
                {team.teamName}
              </h6>
              <div className="flex flex-wrap gap-[10px] ">
                <div className="w-full md:w-[calc(25%-5px)]">
                  <label className="block text-gray-700 mb-1">
                    Total Target
                  </label>
                  <input
                    type="text"
                    name="totalTarget"
                    placeholder="Enter total target"
                    value={`$${formData[team.teamName]?.totalTarget || ""}`}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9.]/g,
                        ""
                      );
                      setFormData((prev: FormData) => {
                        const updatedTeam = { ...prev[team.teamName] };
                        updatedTeam.totalTarget = numericValue;
                        return { ...prev, [team.teamName]: updatedTeam };
                      });
                    }}
                    onFocus={(e) => {
                      e.target.value =
                        formData[team.teamName]?.totalTarget || "";
                    }}
                    onBlur={(e) => {
                      e.target.value = `$${
                        formData[team.teamName]?.totalTarget || ""
                      }`;
                    }}
                    className="border rounded px-2 py-1 w-full !border-[#5D5FEF] !text-[#5D5FEF]"
                  />
                </div>

                {team.members.map((member, memberIndex) => (
                  <div key={memberIndex} className="w-[calc(50%-10px)] md:w-[calc(25%-10px)]">
                    <label className="block">{member}</label>
                    <input
                      type="text"
                      placeholder="Target"
                      value={`$${
                        formData[team.teamName]?.members[memberIndex] || ""
                      }`}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        );
                        setFormData((prev: FormData) => {
                          const updatedTeam = { ...prev[team.teamName] };
                          const updatedMembers = [...updatedTeam.members];
                          updatedMembers[memberIndex] = numericValue;
                          updatedTeam.members = updatedMembers;
                          return { ...prev, [team.teamName]: updatedTeam };
                        });
                      }}
                      onFocus={(e) => {
                        e.target.value =
                          formData[team.teamName]?.members[memberIndex] || "";
                      }}
                      onBlur={(e) => {
                        e.target.value = `${
                          formData[team.teamName]?.members[memberIndex] || ""
                        }`;
                      }}
                      className="border rounded px-2 py-1 w-full" 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Modal Footer */}
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
              className="mt-6 bg-[#5D5FEF] border-solid border-[1px] border-[#5D5FEF] text-white px-8 py-4 w-full max-w-[184px] rounded-full text-[14px]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTargetModal;
