import { type } from "../type";

export const actionChangeName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type:type.CHANGE_NAME})
    }, 3000);    
}