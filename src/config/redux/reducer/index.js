import { type } from "../type";

const initialState = {
    userData: null,
    name: 'Delay',
    buttonActive: true,
    isLogin: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.LOGIN:
            return {
                ...state,
                userData: action.data,
                isLogin: !state.isLogin
            }
        case type.CHANGE_NAME:
            return {
                ...state,
                name: 'CHANGED'
            }
            case type.SWITCH_BUTTON:
            return {
                ...state,
                buttonActive: !state.buttonActive
            }
        default:
            return state;
    }
}

export default rootReducer;