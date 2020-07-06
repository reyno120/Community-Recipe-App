import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            open: false,
            username: '',
            password: '',
            registerUser: '',
            registerPass: '',
            registerEmail: '',
            loginError: 'none',
            registerError: 'none'
        };
    }

    handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        axios.post('/login', {username, password})
            .then((res) => {
                if(!res.data.token) {
                    this.setState({loginError: 'block'})
                }
                else {
                    localStorage.setItem('token', res.data.token);
                    this.setState({open: false});
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleRegister = (e) => {
        e.preventDefault();
        const { registerUser, registerPass, registerEmail } = this.state;
        axios.post('/register', {registerUser, registerPass, registerEmail})
            .then((res) => {
                if(!res.data.userExists) {
                    localStorage.setItem('token', res.data.token);
                    this.setState({open: false});
                }
                else {
                    console.log("test");
                    this.setState({registerError: 'block'});
                }
            });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <Button 
                    onClick={() => this.setState({open: true})}
                    style={{marginLeft: '90em'}}
                >Login</Button>
                <Dialog 
                    aria-labelledby="simple-dialog-title" 
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                >
                    <DialogTitle id="simple-dialog-title" style={{textAlign: 'center'}}>Login</DialogTitle>
                    <DialogContentText style={{
                                        color: 'red', 
                                        textAlign: 'center', 
                                        display: this.state.loginError
                                        }}
                    >Invalid username or password</DialogContentText>
                    <DialogContent>
                        <form onSubmit={this.handleLogin}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="username"
                                type="text"
                                label="Username"
                                onChange={this.onChange}
                                required
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                name="password"
                                type="password"
                                label="Password"
                                onChange={this.onChange}
                                required
                                style={{display: 'block', marginBottom: '1em'}}
                            />
                            <Button type="submit" variant="contained" style={{margin: 'auto auto 2em 7em'}}>Login</Button>
                        </form>
                            <DialogContentText>Don't have an account? Register below!</DialogContentText>
                        <form onSubmit={this.handleRegister}>
                            <DialogContentText style={{
                                                color: 'red', 
                                                textAlign: 'center', 
                                                display: this.state.registerError
                                            }}
                            >Username or email already taken</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="registerUser"
                                type="text"
                                label="Username"
                                onChange={this.onChange}
                                required
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                name="registerEmail"
                                type="email"
                                label="Email"
                                onChange={this.onChange}
                                required
                                style={{display: 'block'}}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                name="registerPass"
                                type="password"
                                label="Password"
                                onChange={this.onChange}
                                required
                                style={{display: 'block', marginBottom: '2em'}}
                            />
                            <Button type="submit" variant="contained" style={{margin: 'auto auto 2em 7em'}}>Register</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>  
        );
    }
}
 
export default Login;