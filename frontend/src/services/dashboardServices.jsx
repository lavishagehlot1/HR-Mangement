import { API_URLs } from "./apiConstant"
import api from "./axios";
export const AdminDashboardServices=async(data)=>{
    console.log(data,'data')
    const response=await api.get(API_URLs.adminDashboard);
    console.log(response,'response');
    return response.data;
}

export const getDepartmentAndRoles=async(data)=>{
    console.log(data,'data');
    const response=await api.get(API_URLs.departmentJobRoles);
    console.log(response,'response');
    return response.data;
}

export const getAllEmployees=async(data)=>{
    console.log(data,'data');
    const response=await api.get(API_URLs.allEmployee);
    console.log(response,'response');
    return response.data.data;
}