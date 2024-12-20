"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { DashboardActiveIcon, DashboardIcon, LeadsActiveIcon, LeadsIcon,  SiteLogo, TargetActiveIcon, TargetIcon } from "@/utils/svgicons";

const SideNav = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);


  const pathname = usePathname();

  const toggleSidebar = () => { 
    setIsCollapsed(!isCollapsed);
  };
  const isActive = (path: string) => pathname === path ? 'active' : '';
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/');
  }
  return (
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom`}>
      <div className="">
        <div className="mb-[40px] ">
              <Link href="/dashboard" className="inline-block">
                <SiteLogo />
              </Link>
          <button onClick={toggleSidebar} className="hamburgerButton">
          </button>
        </div>
        <ul className="navList">
          <li className={isActive('/dashboard')}>
            <Link href="/dashboard">
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
  );
};

export default SideNav;
