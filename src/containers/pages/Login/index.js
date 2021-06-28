import React, { Component } from 'react';
import Button from '../../../components/atoms/buttons';
import { connect } from 'react-redux';
import { type } from '../../../config/redux/type';
import { loginAPI } from '../../../config/redux/action';
class Login extends Component {

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

    handleLogin = () => {
        const {email, password} = this.state.formData;
        this.props.loginAPI({email, password})
        .then(res => {
            this.setState({
                formData: {
                    email: '',
                    password: ''
                }
            });
            const {history} = this.props;
            history.push('/');
        })
        .catch(res => console.log(res.message));
    }

    componentDidMount() {
        if(this.props.login) this.props.history.push('/');
    }

    render(){
        return(
            <div className='auth-container'>
                <div className='auth-card'>
                    <p className='auth-title'>Login</p>
                    <input className='input' type='email' placeholder='Email' name='email' onChange={this.handleChangeForm} value={this.state.formData.email} />
                    <input className='input' type='password' placeholder='Password' name='password' onChange={this.handleChangeForm} value={this.state.formData.password} />
                    <Button title='Register' onClick={this.handleLogin} active={this.props.active} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.isLogin,
        name: state.name,
        active: state.buttonActive
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (newUserData) => dispatch({type: type.REGISTER, data: newUserData}),
        loginAPI: (data) => dispatch(loginAPI(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);