import { type } from "../type";
import firebase from '../../firebase';

export const actionChangeName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type:type.CHANGE_NAME})
    }, 3000);    
}

export const registerAPI = (data) => (dispatch) => {
    dispatch({type: type.SWITCH_BUTTON});
    const {email, password} = data;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        dispatch({type: type.SWITCH_BUTTON});
        // this.props.register(user);
        // console.log('Done: ', this.props);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
    }); 
}

export const loginAPI = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
        const {email, password} = data;
        dispatch({type: type.SWITCH_BUTTON});
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            dispatch({type: type.SWITCH_BUTTON});
            dispatch({type: type.LOGIN, data: userCredential.user});
            resolve(userCredential);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            dispatch({type: type.SWITCH_BUTTON});
            reject(error);
        });
    });
}