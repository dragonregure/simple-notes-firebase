import { type } from "../type";

const initialState = {
    userData: {
        uid: 'example'
    },
    name: 'Delay',
    buttonActive: true,
    isLogin: false,
    notes: []
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
        case type.STORE_NOTES:
            return {
                ...state,
                notes: action.data
            }
        default:
            return state;
    }
}

export default rootReducer;