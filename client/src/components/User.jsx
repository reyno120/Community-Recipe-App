import React, { Component } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class User extends Component {
    state = {  
        open: false
    }

    handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        window.location.reload();
    }

    render() { 
        return (  
            <div>
                <IconButton  style={{marginLeft: '60em'}}>
                    <AccountCircleIcon fontSize={'large'} onClick={() => {this.setState({open: true})}}></AccountCircleIcon>
                    <Drawer anchor={'right'} open={this.state.open} onClose={() => {this.setState({open: false})}}>
                        <Link to="/user/account">
                            <Button style={{fontSize: '18px'}}>My Account</Button>
                        </Link>
                        <Link to="/bookmarks">
                            <Button style={{fontSize: '18px'}}>Bookmarks</Button>
                        </Link>
                        <Button style={{fontSize: '18px'}} onClick={this.handleLogout}>Logout</Button>
                    </Drawer>
                </IconButton>
            </div>

        );
    }
}
 
export default User;