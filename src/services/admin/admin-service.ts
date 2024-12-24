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