import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

class Recipe extends Component {
    state = {  
        recipe: []
    };

    componentDidMount() {
        axios.get('/recipes', {
            params: {
                recipeID: this.props.match.params.recipeID
            }
        })
        .then(res => {
            this.setState({recipe: res.data.recipe});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (  
            <Paper 
                elevation={3} 
                style={{
                    backgroundColor: 'rgb(228, 221, 211)',
                    width: '1366px',
                    margin: 'auto'
                }}>
                {this.state.recipe.map((details, index) => (
                    <h1 style={{
                        color: 'rgb(25, 26, 23)'
                    }}>{details.name}</h1>
                ))}
            </Paper>
        );
    }
}
 
export default Recipe;