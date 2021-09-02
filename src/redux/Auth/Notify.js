import Axios from 'axios';
import Url from '../../config/Url';

export const Notify = async ( token, dispatch) =>{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let res = await Axios.get(`${Url}logistica/dashboard/getNotify`, config);
        let response = await res.data;
        if(response.success) {
            dispatch({ type: "NOTIFY", payload: response.collection });
        }
    } catch (error) {
        console.log(error);
    }

}