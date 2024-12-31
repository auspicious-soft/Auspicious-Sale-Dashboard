import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";
 
export const loginService = async (payload: any) => await axiosInstance.post(`/login`, { username: payload.username, password: payload.password });
export const forgotPasswordService = async (payload: any) => await axiosInstance.patch(`/forgot-password`, payload)
export const sendOtpService = async (payload: any) => await axiosInstance.post(`/verify-otp`, payload)
export const resetUserPassword = async (payload: any) => await axiosInstance.patch(`/new-password-otp-verified`, payload)

//Dashborad Page
export const dashboradPage = async (route: string) => {  
    const axiosInstance = await getAxiosInstance(true)
    return axiosInstance.get(route)
}
export const dashboardOverview = async (route: string) => {  
    const axiosInstance = await getAxiosInstance(true)
    return axiosInstance.get(route)
}
export const dashboardchart = async (route: string) => {  
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
  export const createGetLeadServices = async (route: string) => {  
    const axiosInstance = await getAxiosInstance(true)
    return axiosInstance.get(route)
}
export const createNewLead = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance(true);
    return axiosInstance.post(route, payload);
  };
  export const createBidStatus = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance();
    return axiosInstance.post(route, payload);
}
export const updateBidStatus = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance();
    return axiosInstance.patch(route, payload);
}
export const getTargetStats = async (route: string) => {  
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}   
export const targetModalStats = async (route: string) => {
    const axiosInstance = await getAxiosInstance();
    return axiosInstance.get(route);
}
export const updateTargetModal = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance();
    return axiosInstance.patch(route, payload);
}

export const targetPercentageStatistics = async (route: string) => {  
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}  

export const targetTeamEarning = async (route: string) => {  
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}  
export const targetRevenueTable = async (route: string) => {  
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}  
export const targetValuCard = async (route: string) => {  
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}  