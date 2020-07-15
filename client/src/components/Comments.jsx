import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Comments extends Component {
    state={
        userImages: {},
        comment: '',
        newComment: '',
        image: ''
    };

    componentDidMount() {
        var authors = [];   

        // get list of unique authors to map to their image
        for(var i = 0; i < this.props.comments.length; i++) {
            authors.push(this.props.comments[i].author);
        }

        authors = [...new Set(authors)];

        axios.post('/comments/get', {
            authors: authors,
            action: 'get'
        })
        .then((res) => {
            this.setState({userImages: res.data.userImages})
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { comment } = this.state;
        
        axios.post('/comments/add', {
            comment: comment,
            recipeID: this.props.recipeID,
            action: 'add'
        }, 
        {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then((res) => {
            this.setState({comment: ''});
            this.setState({newComment: res.data.newComment});
            this.setState({image: res.data.image});
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    renderForm() {
        if(sessionStorage.getItem('token')) {
            return (
                <form style={{display: 'block'}}>
                    <TextField label="Add Comment" value={this.state.comment} name="comment" onChange={this.onChange} style={{width: '40em'}}></TextField>
                    <Button type="submit" variant="outlined" onClick={this.handleSubmit}>Send</Button>
                </form>
            );
        }
        else {
            return (
                <p>You must be logged in to add comments</p>
            );
        }
    }

    renderNewComment() {
        if(this.state.newComment !== '') {
            return (
                <Grid container>
                <Grid item xs={12} style={{marginLeft: '1em'}}>
                    <Avatar alt={sessionStorage.getItem('username')} style={{float: 'left'}} src={this.state.image} />
                    <p>{sessionStorage.getItem('username')}</p>
                    <p style={{marginLeft: '4em'}}>{this.state.newComment}</p>
                </Grid>
                </Grid>
            );
        }
    }

    render() { 
        return (  
            <div>
                <h2 style={{marginLeft: '2em', paddingTop: '1em'}}>{this.props.comments.length} Comments</h2>
                {this.props.comments.map((details, index) => {
                    return (
                        <Grid container>
                            <Grid item xs={12} style={{marginLeft: '1em'}}>
                                <Avatar alt={details.author} style={{float: 'left'}} src={this.state.userImages[details.author]} />
                                <p>{details.author}</p>
                                <p style={{marginLeft: '4em'}}>{details.comment}</p>
                            </Grid> 
                        </Grid>
                    );
                })}
                {this.renderNewComment()}
                {this.renderForm()}
            </div>
        );
    }
}
 
export default Comments;