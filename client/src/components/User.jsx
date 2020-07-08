import React, { Component } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

class User extends Component {
    state = {  
        open: false
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    render() { 
        return (  
            <div>
                <IconButton  style={{marginLeft: '60em'}}>
                    <AccountCircleIcon fontSize={'large'} onClick={() => {this.setState({open: true})}}></AccountCircleIcon>
                    <Drawer anchor={'right'} open={this.state.open} onClose={() => {this.setState({open: false})}}>
                        <Button style={{fontSize: '18px'}}>My Account</Button>
                        <Button style={{fontSize: '18px'}} onClick={this.handleLogout}>Logout</Button>
                    </Drawer>
                </IconButton>
            </div>

        );
    }
}
 
export default User;