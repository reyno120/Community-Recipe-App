import React, { Component } from 'react';
import CenterCard from '../components/CenterCard';

class Home extends Component {
    state = {  }
    render() { 
        return (
            <div> 
                <h1>Community Plant-Based Recipes</h1>
                <CenterCard></CenterCard>
            </div> 
        );
    }
}
 
export default Home;