"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";


const MobileHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/');
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <>
      <div className="header min-h-[46px] justify-between gap-[10px] py-[10px] px-[15px] bg-white">

        <div className="logoContainer">
          <Link href="/customer/dashboard">
            
          </Link>
        </div>
        <button onClick={toggleSidebar} className="hamburgerButton">
        </button>
      </div>
      <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom`}>
        <div className="">

          <ul className="navList">
            <li onClick={toggleSidebar} className={isActive('/customer/dashboard')}>
              <Link href="/customer/dashboard">
                <span>Dashboard</span>
              </Link>
            </li>
            <li onClick={toggleSidebar} className={isActive('/customer/wellness')}>
              <Link href="/customer/wellness">
                <span>Wellness</span>
              </Link>
            </li>
            <li onClick={toggleSidebar}  className={isActive('/customer/profile')}>
              <Link href="/customer/profile">
                <span>Profile</span>
              </Link>
            </li>
            <li onClick={toggleSidebar} className={isActive('/customer/change-password')}>
              <Link href="/customer/change-password">
                <span>Change Password</span>
              </Link>
            </li>
            <li onClick={toggleSidebar} className={isActive('/customer/billing-insurance')}>
              <Link href="/customer/billing-insurance">
                <span>Billing & Insurance</span>
              </Link>
            </li>
            <li onClick={toggleSidebar} className={isActive('/customer/plans')}>
              <Link href="/customer/plans">
                <span>Plans</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="navList">
            <li className="!m-0">
              <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <span className="text-[#283C63] text-[600]">Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
