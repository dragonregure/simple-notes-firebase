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
            dispatch({type: type.SWITCH_BUTTON});
            reject(error);
        });
    });
}

export const sendNotesAPI = (data, userData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`notes/${userData.uid}`).push().set({
            id: data.id,
            title: data.title,
            subtitle: data.subtitle,
            content : data.content
          }, (error) => {
              error ? reject(error) : resolve(true);
          });
    });
}

export const getNotesAPI = (userData) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const dbRef = firebase.database().ref();
        // dbRef.child("notes").child(userData.uid).get().then((response) => {
        //     resolve(response);
        // }).catch((error) => {
        //     reject(error);
        // });
        dbRef.child("notes").child(userData.uid).on('value', (response) => {
            const data = [];
            Object.keys(response.val()).map(key => {
                data.push(response.val()[key]);
            });

            dispatch({type: type.STORE_NOTES, data: data});
            
            resolve(data);
        });
    });
}