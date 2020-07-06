import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ReactComponent as Broccoli } from '../images/broccoli.svg';
import { Link } from 'react-router-dom';
import Login from './Login';
import User from './User';

class Navbar extends Component {
    state = {  
        component: ''
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        
        if(token) {
            this.setState({component: <User></User>});
        }
        else {
        this.setState({component: <Login></Login>});
        }
    }
    
    render() { 
        return (  
            <div style={{flexGrow: '1'}}>
                <AppBar position="static" style={{backgroundColor: 'rgb(228, 221, 211)', color: 'rgb(25, 26, 23)'}}>
                    <Toolbar>
                    <Broccoli style={{fill: 'green'}}></Broccoli>
                    <Button style={{textTransform: 'none', marginLeft: '3em'}}>
                        <Typography variant="h6">
                            <Link to="/home">
                                Home
                            </Link>
                        </Typography>
                    </Button>
                    <Button style={{textTransform: 'none', marginLeft: '3em'}}>
                        <Typography variant="h6">
                            <Link to="/discover">
                                Discover
                            </Link>
                        </Typography>
                    </Button>
                    <Button style={{textTransform: 'none', marginLeft: '3em'}}>
                        <Typography variant="h6" >
                            <Link to="/contribute">
                                Contribute
                            </Link>
                        </Typography>
                    </Button>
                    {this.state.component}
              </Toolbar>
            </AppBar>
          </div> 
        );
    }
}
 
export default Navbar;