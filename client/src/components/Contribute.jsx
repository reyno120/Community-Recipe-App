import React, { Component } from 'react';
import ContributeRecipe from './contribute-sub-components/ContributeRecipe';

class Contribute extends Component {
    state = {  
        component: <p></p>
    }

    componentDidMount() {
        const userToken = sessionStorage.getItem('token');
        
        if(userToken) {
            this.setState({component: <ContributeRecipe></ContributeRecipe>});
        }
        else {
            this.setState({component: <h2>Please Login to Contribute a Recipe!</h2>});
        }
    }

    render() { 
        return (
            <div>
                {this.state.component}  
            </div>
        );
    }
}
 
export default Contribute;