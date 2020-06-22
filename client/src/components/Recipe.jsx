import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(this.state.recipe);
        return (  
            <h2>Test recipe</h2>
        );
    }
}
 
export default Recipe;