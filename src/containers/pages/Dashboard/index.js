import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/molecules/cards';
import { sendNotesAPI, getNotesAPI } from '../../../config/redux/action';
import './Dashboard.scss';

class Dashboard extends Component {
    state = {
        formData: {
            id: '',
            title: '',
            subtitle: '',
            content: ''
        }
    }

    // handleGetNotesAPI = () => {
    //     this.props.getNotesAPI(this.props.user).then(res => {
    //         const newCardData = [];
    //         res.forEach(res => {
    //             newCardData.push({
    //                 id: res.val().id,
    //                 title: res.val().title,
    //                 subtitle: res.val().subtitle,
    //                 content: res.val().content
    //             });
    //         });
    //         this.setState({
    //             cardData: newCardData
    //         });
    //     }).catch(err => err);
    // }

    handleChange = (event) => {
        const newFormData = {...this.state.formData}
        newFormData[event.target.id] = event.target.value;
        this.setState({
            formData: newFormData
        });
    }

    handleCreate = () => {
        // console.log(this.state);
        const newFormData = {...this.state.formData}
        const {user, sendNotesAPI} = this.props;
        newFormData['id'] = new Date().getTime();
        newFormData['subtitle'] = new Date().getTime();
        this.setState({
            formData: newFormData
        }, () => {
            sendNotesAPI(this.state.formData, user).then(res => {
                this.setState({
                    formData: {
                        title: '',
                        subtitle: '',
                        content: ''
                    }
                });
            }).catch(err => err);
        });
    }

    componentDidMount() {
        if(!this.props.isLogin) this.props.history.push('/login');
    }
    componentDidUpdate() {
        if(!this.props.isLogin) this.props.history.push('/login');
    }

    render(){        
        return(
            <div className="container">
                <div className="form">
                    <input type="text" id="title" placeholder="Title" onChange={this.handleChange} value={this.state.formData.title}/>
                    <textarea id="content" placeholder="Content" onChange={this.handleChange} value={this.state.formData.content}></textarea>
                    <button className="btn" onClick={this.handleCreate}>Create</button>
                </div>
                <hr />
                {
                    this.props.notes.map(cardData => {
                        return <Card key={cardData.id} data={cardData}/>;
                    })
                }
            </div>
        );
    }
}

const reduxState = (state) => {
    return {
        ...state,
        user: state.userData,
        isLogin: state.isLogin,
        notes: state.notes
    }
}

const reduxDispatch = (dispatch) => {
    return {
        sendNotesAPI: (data, userData) => dispatch(sendNotesAPI(data, userData)),
        getNotesAPI: (userData) => dispatch(getNotesAPI(userData))
    }
}

export default connect(reduxState, reduxDispatch)(Dashboard);