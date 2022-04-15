import {IResponse} from "@/types/rest";
import axios from "axios";
import {URL_API} from "../../../utils/constans";
// import { IUserStats } from '~/types/store/main'

export const getUser = async (): Promise<any> => {
    const response = await axios.get(URL_API+'users')
    console.log(response)
    // if (response.ok) {
    //     if (response.result !== null) {
    //         return response.result
    //     }
    // }
    return response
}
