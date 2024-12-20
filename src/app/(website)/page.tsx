"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import InputField from "@/app/(website)/components/InputField";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/actions"; 
import LoginImage from "./components/LoginImage";
import { SiteLogo } from "@/utils/svgicons";

const Page: React.FC = () => {
  const { data: session } = useSession();
  const [username, serUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  useEffect(() => {
    if (session) {
      if ((session as any)?.user?.role === "user") {
        window.location.href = "/customer/dashboard"
      } else {
        window.location.href = "/admin/dashboard"
      }
    }
  }, [router, session]);

const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let loginFieldType = '';
    
    if (emailRegex.test(username)) {
      loginFieldType = 'username';
    } else {
      toast.error('Please enter a valid email address.');
      return;
    }
  
    if (!password) {
      toast.error('Password is required.');
      return;
    }
    try {
      startTransition(async () => {
        const response = await loginAction({ [loginFieldType]: username, password });
  
        if (response?.success) {
          toast.success('Logged in successfully');
            window.location.href = '/dashboard';
        } else {
          toast.error(
            Array.isArray(response?.message)
              ? response?.message[0].message
              : response?.message || 'An error occurred during login.'
          );
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong! Please try again.');
    }
  };
  
  return (
    <div className="bg-[#D4DFF4] pt-5 md:pt-0">
      <div className="grid md:grid-cols-2 gap-8 md:gap-3 lg:gap-0 items-center md:min-h-screen ">
        <div className="bg-white h-full rounded-[30px] m-5 md:m-0  ">
          <div className="flex flex-col justify-center h-full max-w-[465px] p-5 mx-auto ">
            <p className="mb-5 md:mb-9 text-center mx-auto">
              <SiteLogo />
            </p>
            <h2 className="text-center text-[30px] mb-5 md:mb-9 ">
              Welcome Back
            </h2>
            <div className="login rounded-[20px] bg-white">
              <div className="">
                <form onSubmit={handleSubmit}>
                  <InputField
                    type="email"
                    label="Email Address"
                    value={username}
                    placeholder="Email Address "
                    onChange={(e) => serUsername(e.target.value)}
                  />
                  <InputField
                    type="password"
                    label="Your Password"
                    value={password}
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="mt-[-10px] mb-[50px] flex justify-between items-center">
                    <label htmlFor="" className="text-[#353E6C] text-[14px] ">
                      {/* <input type="checkbox" name="" id="" className="mr-[10px]" /> */}
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="mr-[10px]"
                      />
                      Keep me logged in
                    </label>

                    <Link
                      href="/forgotpassword"
                      className="text-[#151D48] text-[14px] "
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button type="submit" className="login-button w-full">
                    <a href="/dashboard">
                    {!isPending ? "Log In" : "Logging In"}
                    </a>
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
        <LoginImage />
      </div>
    </div>
  );
};

export default Page;
