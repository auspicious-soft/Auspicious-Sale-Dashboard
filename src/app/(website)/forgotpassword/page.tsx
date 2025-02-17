"use client";
import React, {useState, useTransition} from "react";
import InputField from "@/app/(website)/components/InputField";
import LoginImage from "../components/LoginImage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotPasswordService } from "@/services/admin/admin-service";
import { SiteLogo } from "@/utils/svgicons";

const Page: React.FC = () => {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [isPending, startTransition] = useTransition()
  const handleChange = (e: any) => {
    setUsername(e.target.value)
  }

const handleSubmit = (e: any) => {
  e.preventDefault()
  startTransition(async () => {
    try {
      const response = await forgotPasswordService({ username })
      if (response.status === 200) {
        toast.success('Email sent successfully to you with otp')
        router.push('/otp')
      }
      else {
        toast.error("Something went wrong")
      }
    }
    catch (err: any) {
      if (err.status == 404) toast.error('Email not found')
      else toast.error('Something went wrong')
    }
  })
}

  return (
    <>
    <div className="bg-[#D4DFF4] pt-5 md:pt-0">
      <div className="grid md:grid-cols-2 gap-8 md:gap-3 lg:gap-0 items-center  ">
        <div className="bg-white h-full rounded-[30px] m-5 md:m-0  ">
    <div className="flex flex-col justify-center h-full max-w-[465px] p-5 mx-auto ">
     <p className="mb-5 md:mb-9 text-center mx-auto">
       <SiteLogo />  
          </p>
          <h2 className=" text-center font-[700] text-[30px] mb-5 md:mb-9 ">Forgot Password?</h2>
        <div className="login rounded-[20px] bg-white">
        <form>
          <InputField
          label="Email Address"
            type="email"
            value={username} 
            placeholder="Email Address"
            onChange={handleChange}
          />
           <button disabled={isPending} onClick={handleSubmit} type="submit" className="login-button w-full mt-[50px]">
           Confirm</button>
        {/* <Link href="/resetpassword" className="login-button w-full mt-[50px]">Confirm</Link> */}
       
          </form>
        </div>
       </div>
          </div>
          <LoginImage/>
        </div>
        </div>
        </>
    );
}

export default Page;
