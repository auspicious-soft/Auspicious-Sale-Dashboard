"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { ArrowIcon, UserIcon } from "@/utils/svgicons";

export default function NotificationBar() {
  const [showData, setShowData] = useState(false);

  const togglePopup = () => {
    setShowData(!showData);
  };

  return (
    <div>
      <div className="flex items-center gap-3 md:gap-5 relative">
        {/* Main Button */}
        <div
          className="cursor-pointer flex items-center justify-center gap-3 bg-[#fff] p-[5px] pr-[10px] md:pr-[20px] rounded-[24px]"
          onClick={togglePopup} // Toggle popup on click
        >
          <div className="bg-[#092097] w-[28px] h-[28px] flex items-center justify-center rounded-full md:w-[38px] md:h-[38px]">
            <UserIcon />
          </div>
          <div className="hidden md:block">
            <h6 className="text-[#292D32] text-[14px] font-RalewayMedium">
              Auspicioussoft
            </h6>
            <p className="text-[rgba(41,45,50,0.44)] text-[12px]">
              Administrator
            </p>
          </div>
          <div>
            <ArrowIcon />
          </div>
        </div>

        {/* Popup */}
        {showData && (
          <div className="text-right absolute z-[2] top-[50px] right-0 w-[200px] h-auto bg-white p-3 rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.08)]">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="button cursor-pointer font-RalewayMedium text-sm bg-[#E87223]  !py-2 !px-2 !bg-transparent !text-[#000]"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
