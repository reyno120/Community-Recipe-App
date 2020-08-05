import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Tabs from './Tabs';
import Paper from '@material-ui/core/Paper'

class Account extends Component {
    state = {  
        file: null,
        filename: '',
        image: '',
        followers: [],
        following: []
    };

    componentDidMount() {
        axios.get('/user/info', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then((res) => {
            this.setState({image: res.data.image});
            this.setState({followers: res.data.followers});
            this.setState({following: res.data.following});
        });
    }

    fileOnChange = (e) => {
        if(e.target.files[0]) {
            this.setState({file: e.target.files[0]});
            this.setState({filename: e.target.files[0].name});
            this.setState({image: URL.createObjectURL(e.target.files[0])});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('file', this.state.file);

        axios.post('/user/update', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then((res) => {
            // alert user saying success
        });
    }

    render() { 
        return (
            <div>
                <Paper 
                    elevation={3} 
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: '2.5em auto auto auto'
                    }}
                >
                    <div style={{height: '.2em'}}></div>
                    <form onSubmit={this.handleSubmit}>
                        <Avatar alt={sessionStorage.getItem('username')} style={{width: '12em', height: '12em', margin: '2em auto auto auto'}} src={this.state.image} />
                        <div style={{textAlign: 'center', marginTop: '2em'}}>
                            <Button component="label" variant="contained" style={{backgroundColor: 'rgb(254, 98, 57)'}}>
                                Upload Image
                                <input type='file' 
                                    style={{display: 'none'}} 
                                    name="file" 
                                    id='profileImage' 
                                    onChange={this.fileOnChange}>
                                </input>
                            </Button>
                        </div>
                        <div style={{textAlign: 'center', marginTop: '2em'}}>
                            <Button type="submit" variant="contained" style={{backgroundColor: 'rgb(254, 98, 57)'}}>
                                Save
                            </Button>
                            <Tabs following={this.state.following} followers={this.state.followers}></Tabs>
                        </div>
                    </form>
                    <div style={{height: '2em'}}></div>
                </Paper>
            </div>  
        );
    }
}
 
export default Account;