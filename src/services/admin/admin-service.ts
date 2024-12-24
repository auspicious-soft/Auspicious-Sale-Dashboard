import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";
 
export const loginService = async (payload: any) => await axiosInstance.post(`/login`, { username: payload.username, password: payload.password });
export const forgotPasswordService = async (payload: any) => await axiosInstance.patch(`/forgot-password`, payload)
export const sendOtpService = async (payload: any) => await axiosInstance.post(`/verify-otp`, payload)
export const resetUserPassword = async (payload: any) => await axiosInstance.patch(`/new-password-otp-verified`, payload)


export const dashboradPage = async (route: string) => {  
    const axiosInstance = await getAxiosInstance(true)
    return axiosInstance.get(route)
}
export const getLeadStatus = async (route: string) => {  
    const axiosInstance = await getAxiosInstance(true)
    return axiosInstance.get(route)
}
export const updateLeadStatus = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance(true);
    return axiosInstance.patch(route, payload);
}
export const getAllLeads = async (route: string) => {  
    const axiosInstance = await getAxiosInstance(true)
    return axiosInstance.get(route)
}
export const createBidStatus = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance();
    return axiosInstance.post(route, payload);
}
export const updateBidStatus = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance();
    return axiosInstance.patch(route, payload);
}

// const handleSaveAmount = async () => {
//     const finalAmount = editedAmount ?? dashboardData?.bidsThisMonth?.amount ?? 0;
//     const id = dashboardData?.bidsThisMonth?._id;
//     const actionData = {
//       amount: finalAmount,
//       date: selectedDate?.format('YYYY-MM-DD')
//     };
//     try {
//       const existingAmount = dashboardData?.bidsThisMonth?.amount;
//       let response;
//       if (existingAmount && id) {
//         response = await updateBidStatus(`/admin/bid/${id}`, actionData);
//       } else {
//         response = await createBidStatus('/admin/bid', actionData);
//       }
//       if (response.status === 200) {
//         startTransition(() => {
//           const updatedData = {
//             ...dashboardData,
//             bidsThisMonth: {
//               ...dashboardData?.bidsThisMonth,
//               amount: finalAmount,
//               _id: response.data?._id 
//             }
//           };
//           mutate(updatedData, false);
//         });
//         toast.success(existingAmount ? "Bid status updated successfully" : "Bid status created successfully");
//         setIsEditingAmount(false);
//         await mutate(); 
//       } else {
//         toast.error("Failed to update Bid status");
//         console.error("Unexpected response:", response);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Error updating bid status");
//       await mutate(); 
//     }
//   };