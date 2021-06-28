import React, { Component } from 'react';
import { connect } from 'react-redux';
import {type} from '../../../config/redux/type';
import { actionChangeName, registerAPI } from '../../../config/redux/action';
import './Register.scss';
import Button from '../../../components/atoms/buttons';


class Register extends Component {
    state = {
        formData: {
            email: '',
            password: ''
        }
    }

    handleChangeForm = (event) => {
        let newFormData = {...this.state.formData};
        newFormData[event.target.name] = event.target.value;
        this.setState({
            formData: newFormData
        });
    }

    handleRegister = () => {
        const {email, password} = this.state.formData;
        this.props.registerAPI({email, password});
        this.setState({
            formData: {
                email: '',
                password: ''
            }
        });
    }

    render() {
        return(
            <div className='auth-container'>
                <div className='auth-card'>
                    <p className='auth-title'>Register</p>
                    <input className='input' type='email' placeholder='Email' name='email' onChange={this.handleChangeForm} value={this.state.formData.email} />
                    <input className='input' type='password' placeholder='Password' name='password' onChange={this.handleChangeForm} value={this.state.formData.password} />
                    <Button title='Register' onClick={this.handleRegister} active={this.props.active} />
                </div>
                {/* <Link to='/login'><button>Go to Login</button></Link> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userData,
        name: state.name,
        active: state.buttonActive
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (newUserData) => dispatch({type: type.REGISTER, data: newUserData}),
        delay: () => dispatch(actionChangeName()),
        registerAPI: (data) => dispatch(registerAPI(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);