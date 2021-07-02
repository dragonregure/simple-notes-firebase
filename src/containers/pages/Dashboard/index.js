import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/molecules/cards';
import { sendNotesAPI, getNotesAPI, updateNotesAPI, deleteNotesAPI } from '../../../config/redux/action';
import './Dashboard.scss';

class Dashboard extends Component {
    state = {
        formData: {
            id: '',
            title: '',
            subtitle: '',
            content: ''
        },
        buttonAction: 'SIMPAN'
    }

    handleGetNotesAPI = () => {
        // this.props.getNotesAPI(this.props.user).then(res => {
        //     const newCardData = [];
        //     res.forEach(res => {
        //         newCardData.push({
        //             id: res.val().id,
        //             title: res.val().title,
        //             subtitle: res.val().subtitle,
        //             content: res.val().content
        //         });
        //     });
        //     this.setState({
        //         cardData: newCardData
        //     });
        // }).catch(err => err);
        this.props.getNotesAPI(this.props.user);
    }

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
        const {user, sendNotesAPI, updateNotesAPI} = this.props;
        newFormData['subtitle'] = new Date().getTime();
        if(this.state.buttonAction === 'SIMPAN') {
            newFormData['id'] = new Date().getTime();
            sendNotesAPI(newFormData, user).then(res => {
                this.setState({
                    formData: {
                        id: '',
                        title: '',
                        subtitle: '',
                        content: ''
                    }
                });
            }).catch(err => err);
        } else {
            updateNotesAPI(newFormData, user).then(res => {
                this.setState({
                    formData: {
                        id: '',
                        title: '',
                        subtitle: '',
                        content: ''
                    }
                });
            }).catch(err => err);
        }
        
    }

    handleEdit = (data) => {
        this.setState({
            ...this.state,
            buttonAction: 'UPDATE',
            formData: {
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                content: data.content
            }
        });
    }

    handleDelete = (e, data) => {
        e.stopPropagation();
        this.props.deleteNotesAPI(this.props.user, data);
    }

    componentDidMount() {
        if(!this.props.isLogin) this.props.history.push('/login');
        this.handleGetNotesAPI();
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
                    <button className="btn" onClick={this.handleCreate}>{this.state.buttonAction}</button>
                </div>
                <hr />
                {
                    this.props.notes.length > 0 ? this.props.notes.map(cardData => {
                        return <Card
                                key={cardData.id} data={cardData}
                                onClick={() => this.handleEdit(cardData)}
                                onDelete={(e) => this.handleDelete(e, cardData)}/>;
                    }) : null
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
        getNotesAPI: (userData) => dispatch(getNotesAPI(userData)),
        updateNotesAPI: (data, userData) => dispatch(updateNotesAPI(data, userData)),
        deleteNotesAPI: (userData, cardData) => dispatch(deleteNotesAPI(userData, cardData))
    }
}

export default connect(reduxState, reduxDispatch)(Dashboard);