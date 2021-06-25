import { type } from "../type";

const initialState = {
    userData: null,
    name: 'Delay'
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.REGISTER:
            return {
                ...state,
                userData: action.data
            }
        case type.CHANGE_NAME:
            return {
                ...state,
                name: 'CHANGED'
            }
        default:
            return state;
    }
}

export default rootReducer;