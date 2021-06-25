import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render(){
        console.log(this.props.user);
        return(
            <div>
                <h1>Dashboard Page</h1>
                <button>Go to Login</button>
                <button>Go to Register</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        user: state.userData
    }
}

export default connect(mapStateToProps)(Dashboard);