import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';


class Comments extends Component {
    state={
        userImages: {}
    };

    componentDidMount() {
        var authors = [];   

        // get list of unique authors to map to their image
        for(var i = 0; i < this.props.comments.length; i++) {
            authors.push(this.props.comments[i].author);
        }

        authors = [...new Set(authors)];

        axios.post('/comments', {authors})
        .then((res) => {
            this.setState({userImages: res.data.userImages})
        })
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
            </div>
        );
    }
}
 
export default Comments;