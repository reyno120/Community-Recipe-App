import React, { Component } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

class User extends Component {
    state = {  

    }
    render() { 
        return (  
            <div>
                <IconButton  style={{marginLeft: '60em'}}>
                    <AccountCircleIcon fontSize={'large'}></AccountCircleIcon>
                </IconButton>
            </div>

        );
    }
}
 
export default User;