import axios from "axios";
import {URL_API} from "@/utils/constans";

export const getData = async (method:string, payload:any): Promise<any> => {
    const response = await axios.get(URL_API + method,{params:payload})
    if (response.status === 200) {
        return response.data
    } else {
        console.log('empty')
        return false
    }
}
