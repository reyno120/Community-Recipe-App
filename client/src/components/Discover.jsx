import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import IngredientList from '../data/ingredients';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import SingleCard from './SingleCard';


class Discover extends Component {
    state = {  
        saltFree: true,
        oilFree: true,
        sugarFree: true,
        glutenFree: false,
        nutFree: false,
        peanutFree: false,
        soyFree: false,
        allergens: ['saltFree', 'oilFree', 'sugarFree'],
        ingredients: [],
        difficulty: '',
        time: 0,
        recipes: []
    };


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.checked});
        var allergens = this.state.allergens
        if(e.target.checked) {
            allergens.push(e.target.name);
        }
        else {
            var index = allergens.indexOf(e.target.name);
            allergens.splice(index, 1);
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleIngredients = (e) => {
        var ingredients = [];
        if(e) {
            for(var i = 0; i < e.length; i++) {
                ingredients.push(e[i].value);
            }
        }
        this.setState({ingredients: ingredients});
    }

    handleSubmit = () => {
        const { ingredients, time, difficulty, allergens } = this.state;

        axios.post('/discover', {ingredients, difficulty, time, allergens})
        .then((res) => {
            this.setState({recipes: res.data.recipes});
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
                    <h2 style={{textAlign: 'center'}}>Discover New Recipes!</h2>
                    <Grid container>
                        <Grid item xs={4} align='center'>
                            <h2>Allergens:</h2>
                            <div style={{textAlign: 'left', marginLeft: '3em'}}>
                                <p><Checkbox name="saltFree" onChange={this.handleChange} checked={this.state.saltFree}/>no added salt</p>
                                <p><Checkbox name="oilFree" onChange={this.handleChange} checked={this.state.oilFree}/>oil-free</p>
                                <p><Checkbox name="sugarFree" onChange={this.handleChange} checked={this.state.sugarFree}/>no added sugar</p>
                                <p><Checkbox name="glutenFree" onChange={this.handleChange} />gluten free</p>
                                <p><Checkbox name="nutFree" onChange={this.handleChange} />nut free</p>
                                <p><Checkbox name="peanutFree" onChange={this.handleChange} />peanut free</p>
                                <p><Checkbox name="soyFree" onChange={this.handleChange} />soy free</p>
                            </div>
                        </Grid>
                        <Grid item xs={4} align='center'>
                            <h2>Time</h2>
                            <input type="number"></input>

                        </Grid>
                        <Grid item xs={4} align='center'>
                            <h2>Difficulty</h2>
                            <p>Easy
                                <Radio
                                    checked={this.state.difficulty === 'Easy'}
                                    value={"Easy"}
                                    onChange={this.onChange}
                                    name="difficulty"
                                />
                            </p>
                            <p>Medium
                                <Radio
                                    checked={this.state.difficulty === 'Medium'}
                                    value={"Medium"}
                                    onChange={this.onChange}
                                    name="difficulty"
                                />
                            </p>
                            <p>Hard
                                <Radio
                                    checked={this.state.difficulty === 'Hard'}
                                    value={"Hard"}
                                    onChange={this.onChange}
                                    name="difficulty"
                                />
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Ingredients:</h2>
                            <Select 
                                isMulti
                                onChange={this.handleIngredients}
                                options={IngredientList}
                                isSearchable={true}
                            />
                        </Grid>
                        <Button variant="outlined" onClick={this.handleSubmit}>Submit</Button> 
                    </Grid>
                </Paper>
                <Paper
                    elevation={3}
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto'
                    }}>
                    <Grid container>
                        {this.state.recipes.map((details, index) => (
                            <Grid item xs={3}>
                                <SingleCard
                                    key={index} 
                                    name={details.name}
                                    description={details.description}
                                    author={details.author}
                                    source={details.source}
                                    directions={details.directions}
                                    ingredients={details.ingredients}
                                    date={details.date}
                                    image={details.image}
                                    recipeID={details.recipeID}
                                    likedBy={details.likedBy}
                                    likes={details.likes}
                                    authorImage={details.authorImage}
                                ></SingleCard>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </div>
        );
    }
}
 
export default Discover;