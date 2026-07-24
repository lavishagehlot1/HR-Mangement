import { API_URLs } from "./apiConstant"
import api from "./axios";
export const loginServices=async(data)=>{
    console.log('Data received in services',data);
    const res=await api.post(API_URLs.login,data);
    console.log('Response',res);
    return res.data;
}
