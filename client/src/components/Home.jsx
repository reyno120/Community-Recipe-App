import React, { Component } from 'react';
import CenterCard from '../components/CenterCard';

class Home extends Component {
    state = {  }
    render() { 
        return (
            <div> 
                <h1>Community Vegan Recipes</h1>
                <CenterCard></CenterCard>
            </div> 
        );
    }
}
 
export default Home;