import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    state = {  
        user: []
    }

    componentDidMount() {
        axios.get('/users', {
            params: {
                username: this.props.match.params.username
            }
        })
        .then((res) => {
            this.setState({user: res.data.user[0]});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() { 
        return (  
            <div>
                <h2>{this.state.user.username}</h2>
            </div>
        );
    }
}
 
export default Profile;