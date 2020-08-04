import React, { Component } from 'react';
import ContributeRecipe from './contribute-sub-components/ContributeRecipe';

class EditRecipe extends Component {
    state = {}

    render() { 
        return (  
            <ContributeRecipe
                edit={'true'} 
                recipeID={this.props.match.params.recipeID} 
            />
        );
    }
}
 
export default EditRecipe;