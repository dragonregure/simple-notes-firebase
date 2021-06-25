import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../config/firebase';
import {type} from '../../../config/redux/type';
import { actionChangeName } from '../../../config/redux/action';
import './Register.scss';


class Register extends Component {
    state = {
        formData: {
            email: '',
            password: ''
        }
    }

    goToDashboard = () => {
        console.log(this.props.history);
    }

    handleChangeForm = (event) => {
        let newFormData = {...this.state.formData};
        newFormData[event.target.name] = event.target.value;
        this.setState({
            formData: newFormData
        });
    }

    handleRegister = () => {
        console.log(this.props);
        const {email, password} = this.state.formData;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            this.props.register(user);
            console.log('Done: ', this.props);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    }

    render() {
        return(
            <div className='auth-container'>
                <div className='auth-card'>
                    <p className='auth-title'>{this.props.name}</p>
                    <input className='input' type='email' placeholder='Email' name='email' onChange={this.handleChangeForm} />
                    <input className='input' type='password' placeholder='Password' name='password' onChange={this.handleChangeForm} />
                    <button className='btn' onClick={this.handleRegister}>Register</button>
                </div>
                {/* <Link to='/login'><button>Go to Login</button></Link> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userData,
        name: state.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (newUserData) => dispatch({type: type.REGISTER, data: newUserData}),
        delay: () => dispatch(actionChangeName())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);