import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import tempImage from '../images/anna-pelzer-unsplash.jpg';
import Grid from '@material-ui/core/Grid';

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
            <div>
                <Paper 
                    elevation={3} 
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto'
                    }}>
                    {this.state.recipe.map((details, index) => (
                        <div>
                            <h1 style={{
                                color: 'rgb(25, 26, 23)',
                                textDecoration: 'underline',
                                paddingTop: '.5em',
                                marginBottom: '0'
                            }}>{details.name}</h1>
                            <div style={{textAlign: 'center'}}>
                                <p style={{display: 'inline-block', fontSize: '24px'}}>Difficulty: {details.difficulty}</p>
                                <p style={{display: 'inline-block', fontSize: '24px', marginLeft: '3em' , marginBottom: '1em'}}>Time: {details.time}</p>
                            </div>
                            <img src={tempImage} alt="temporary" style={{width: '40%', marginLeft: '25em', display: 'block'}} />
                            <p style={{
                                fontSize: '18px',
                                margin: '3em 10em 3em 10em',  
                                textAlign: 'center',
                                }}>{details.description}</p>
                            <Grid container>
                                <Grid item xs={3} align="center">
                                    <p>Calories: {details.nutrition.calories}</p>
                                    <p>Carbs: {details.nutrition.carbs}</p>
                                    <p>Fat: {details.nutrition.fat}</p>
                                    <p>Protein: {details.nutrition.protein}</p>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <h2>Ingredients</h2>
                                    <ul style={{listStylePosition: 'inside'}}>
                                        {details.ingredients.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </Grid>
                                <Grid item xs={3} align="center">
                                    <h2>Useful tips</h2>
                                    <ul style={{listStylePosition: 'inside'}}>
                                        {details.tips.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </Grid>
                            </Grid>
                            <h2 style={{
                                fontWeight: '800', 
                                fontSize: '24px', 
                                textDecoration: 'underline',
                                marginLeft: '7em'
                                }}>Directions:</h2>
                            <ul style={{marginLeft: '12em', listStyleType: 'decimal'}}>
                                {details.directions.map((value, index) => {
                                    return <li key={index}>{value}</li>
                                })}
                            </ul>
                            <Grid container>
                                <Grid item xs={6} align="center">
                                    <p>Author: {details.author}</p>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <p>Source: {details.source}</p>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </Paper>
                <div style={{height: '2em'}}></div>
            </div>
        );
    }
}
 
export default Recipe;