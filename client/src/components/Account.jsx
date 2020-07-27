import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Account extends Component {
    state = {  
        file: null,
        filename: '',
        image: ''
    };

    componentDidMount() {
        axios.get('/user/info', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then((res) => {
            this.setState({image: res.data.image});
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
                <form onSubmit={this.handleSubmit}>
                    <Avatar alt={sessionStorage.getItem('username')} style={{width: '12em', height: '12em', margin: 'auto', marginTop: '2em'}} src={this.state.image} />
                    <div style={{textAlign: 'center', marginTop: '2em'}}>
                        <Button component="label" variant="contained">
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
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                    </div>
                </form>
            </div>  
        );
    }
}
 
export default Account;