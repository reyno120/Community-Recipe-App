import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Comments extends Component {
    state={};

    render() { 
        return (  
            <Paper                    
                elevation={3} 
                style={{
                    backgroundColor: 'rgb(228, 221, 211)',
                    width: '1366px',
                    margin: 'auto'
                }}>
                <h2 style={{marginLeft: '2em', paddingTop: '1em'}}>3 Comments</h2>
                {this.props.comments.map((details, index) => {
                    return (
                        <div>
                            <p>{details.author}</p>
                            <p>{details.comment}</p>
                        </div>
                    );
                })}
            </Paper>
        );
    }
}
 
export default Comments;