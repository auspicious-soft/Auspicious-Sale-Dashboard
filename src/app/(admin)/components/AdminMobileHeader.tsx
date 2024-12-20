"use client";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {  DashboardActiveIcon, DashboardIcon, HamburgerIcon, LeadsActiveIcon, LeadsIcon, SiteLogo, TargetActiveIcon, TargetIcon } from "@/utils/svgicons";
import NotifactionBar from "./NotifactionBar";


const AdminMobileHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/');
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  
  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden'); 
    };
  }, [isCollapsed]);
 
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const isActive = (path: string) => pathname === path ? 'active' : '';

  const handleLinkClick = (path: string) => {
    setIsCollapsed(false); 
  };

  return (
    <>
      <div className="header min-h-[46px] flex justify-between gap-[10px] py-[15px] px-[15px] bg-white">

        <div className="logoContainer">
          <Link href="/dashboard">
            <SiteLogo />
          </Link>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
         <NotifactionBar />
        <button onClick={toggleSidebar} className="hamburgerButton">
          <HamburgerIcon />
        </button>
        </div>
      </div>
      <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom`}>
        <div className="">

        <ul className="navList">
          <li className={isActive('/dashboard')}>
            <Link href="/dashboard" onClick={() => handleLinkClick("/dashboard")}>
              {isActive('/dashboard') ? <DashboardActiveIcon /> : <DashboardIcon />}
              Dashboard
            </Link>
          </li>
          <li className={isActive('/leads')}>
            <Link href="/leads">
              {isActive('/leads') ? <LeadsActiveIcon /> : <LeadsIcon />}
              Leads
            </Link>
          </li>
          <li className={isActive('/target')}>
            <Link href="/target">
              {isActive('/target') ? <TargetActiveIcon /> : <TargetIcon />}
              Target
            </Link>
            </li>
        </ul>
        </div>
      </div>
    </>
  );
};

export default AdminMobileHeader;
