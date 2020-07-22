import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IngredientList from '../../data/ingredients';
import Select from 'react-select';
import Radio from '@material-ui/core/Radio';
import Directions from './Directions';
import Tips from './Tips';
import Allergens from './Allergens';

class ContributeRecipe extends Component {
    state = {
        file: null,
        filename: '',
        name: '',
        description: '',
        image: '',
        calories: '',
        carbs: '',
        fat: '',
        protein: '',
        ingredients: [],
        allergens: ["saltFree", "oilFree", "sugarFree", "glutenFree", "nutFree", "soyFree", "peanutFree"],
        amounts: [],
        difficulty: '',
        time: '',
        directions: [],
        tips: [],
        contributors: '',
        source: '',
        selectedIngredient: '',
        nutritionDisplay: 'none',
        dispButton: 'block',
        displaySuccess: 'none',
        displayContribute: 'block'
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleAmounts = (index) => (e) => {
        const { amounts } = this.state;
        const newAmounts = amounts.slice(0);
        newAmounts[index] = e.target.value;
        this.setState({amounts: newAmounts});
    }

    handleDirections = (index) => (e) => {
        const { directions } = this.state;
        const newDirections = directions.slice(0);
        newDirections[index] = e.target.value;
        this.setState({directions: newDirections});
    }

    deleteDirection = () => {
        var directions = this.state.directions;
        directions.pop();
        this.setState({directions: directions});
    }

    handleTips = (index) => (e) => {
        const { tips } = this.state;
        const newTips = tips.slice(0);
        newTips[index] = e.target.value;
        this.setState({tips: newTips});
    }

    deleteTip = () => {
        var tips = this.state.tips;
        tips.pop();
        this.setState({tips: tips});
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

    handleAllergens = (allergen, condition) => {
        var { allergens } = this.state;

        if(condition) {
            if(!allergens.includes(allergen)) {
                allergens.push(allergen);
            }
        }
        else {
            if(allergens.includes(allergen)) {
                var index = allergens.indexOf(allergen);
                allergens.splice(index, 1);
            }
        }

        this.setState({allergens: allergens});
        console.log(allergens);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('file', this.state.file);
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('calories', this.state.calories);
        data.append('carbs', this.state.carbs);
        data.append('fat', this.state.fat);
        data.append('protein', this.state.protein);
        data.append('difficulty', this.state.difficulty);
        data.append('time', this.state.time);
        data.append('contributors', this.state.contributors);
        data.append('source', this.state.source);
        data.append('created', new Date());

        for(var i = 0; i < this.state.ingredients.length; i++) {
            data.append('ingredients', this.state.ingredients[i]);
        }
        
        for(var i = 0; i < this.state.allergens.length; i++) {
            data.append('allergens', this.state.allergens[i]);
        }

        for(var i = 0; i < this.state.amounts.length; i++) {
            data.append('amounts', this.state.amounts[i]);
        }

        for(var i = 0; i < this.state.directions.length; i++) {
            data.append('directions', this.state.directions[i]);
        }

        for(var i = 0; i < this.state.tips.length; i++) {
            data.append('tips', this.state.tips[i]);
        }
    
        axios.post('/recipeUpload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
        .then((res) => {
            this.setState({displaySuccess: 'block'});
            this.setState({displayContribute: 'none'});
        });
    }

    fileOnChange = (e) => {
        if(e.target.files[0]) {
            this.setState({file: e.target.files[0]});
            this.setState({filename: e.target.files[0].name});
            this.setState({image: URL.createObjectURL(e.target.files[0])});
        }
    }

    render() { 
        return (  
            <div>
                <Paper
                    elevation={3}
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto',
                        display: this.state.displaySuccess
                    }}>
                        <h2 style={{
                                color: 'rgb(25, 26, 23)', 
                                textAlign: 'center', 
                                fontSize: '36px'
                            }}>Your recipe has been successfully posted!</h2>
                </Paper>
                <Paper 
                    elevation={3} 
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto',
                        display: this.state.displayContribute
                    }}>
                        <h1 style={{
                                color: 'rgb(25, 26, 23)',
                                paddingTop: '.5em',
                                marginBottom: '1em'
                            }}>Share your Delicious Recipe!</h1>
                        <form onSubmit={this.handleSubmit}>


                            <Grid container>
                                {/*****************Name/Image *************/}
                                <Grid item xs={6} align="center">
                                    <h2 style={{marginBottom: '0'}}>What is the name of your Recipe?</h2>
                                    <TextField name="name" onChange={this.onChange} label="Recipe Name" color="none" style={{width: '23em'}} />
                                    <h2 style={{marginBottom: '0'}}>Describe your Recipe:</h2>
                                    <TextField name="description" onChange={this.onChange} label="Description" multiline rowsMax={3} style={{width: '23em'}} />
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <Button component="label" variant="outlined" style={{marginBottom: '2em'}}>
                                        Upload Image
                                        <input type='file' 
                                               style={{display: 'none'}} 
                                               name="file" 
                                               id='customImage' 
                                               onChange={this.fileOnChange}>
                                        </input>
                                    </Button>
                                    <label htmlFor='customImage'>{this.filename}</label>
                                    <img style={{width: '50%', display: 'block'}} src={this.state.image} alt={''}/>
                                </Grid>

                                {/*****************Nutrition/Ingredients/Amount*************/}
                                <Grid xs={4} align="center" style={{marginTop: '2em'}}>
                                    <h2>Nutrition:</h2>
                                    <Button 
                                        variant="contained" 
                                        style={{display: this.state.dispButton}}
                                        onClick={() => {this.setState({nutritionDisplay: 'block', dispButton: 'none'})}}>
                                        Add Nutrition
                                    </Button>
                                    <div style={{display: this.state.nutritionDisplay}}>
                                        <p>Calories: <TextField name="calories" onChange={this.onChange} style={{width: '3em'}}/></p>
                                        <p>Carbs: <TextField name="carbs" onChange={this.onChange} style={{width: '3em'}}/></p>
                                        <p>Protein: <TextField name="protein" onChange={this.onChange} style={{width: '3em'}}/></p>
                                        <p>Fat: <TextField name="fat" onChange={this.onChange} style={{width: '3em'}}/></p>
                                    </div>
                                </Grid>
                                <Grid xs={4} align="center" style={{marginTop: '2em'}}>
                                    <h2>Ingredients:</h2>
                                    <Select
                                        isMulti
                                        onChange={this.handleIngredients}
                                        options={IngredientList}
                                        isSearchable={true}
                                    />
                                </Grid>
                                <Grid xs={4} align="center" style={{marginTop: '2em'}}>
                                    <h2>Amount:</h2>
                                    {this.state.ingredients.map((ingredient, index) => {
                                        return (
                                            <div>
                                                <p style={{
                                                    fontSize: '18px',
                                                    display: 'inline' 
                                                    }}>{ingredient}: </p>
                                                <TextField onChange={this.handleAmounts(index)} style={{width: '5em'}}/>
                                            </div>
                                        );
                                    })}
                                </Grid>


                                {/******** Allergens *********/}
                                <Grid xs={12}>
                                    <Allergens ingredients={this.state.ingredients} handleAllergens={this.handleAllergens}></Allergens>
                                </Grid>

                                {/*****************Difficulty*************/}
                                <Grid xs={12} align="center">
                                    <h2 style={{marginTop: '3em'}}>Who is this recipe for?</h2>
                                </Grid>
                                <Grid xs={4} align="right">
                                    <p>Beginner Sous Chef</p>
                                    <Radio
                                        checked={this.state.difficulty === 'Easy'}
                                        value={"Easy"}
                                        onChange={this.onChange}
                                        name="difficulty"
                                        style={{marginRight: '2em'}}
                                    />
                                </Grid>
                                <Grid xs={4} align="center">
                                    <p>Experienced Cook</p>
                                    <Radio
                                        checked={this.state.difficulty === 'Medium'}
                                        value={"Medium"}
                                        onChange={this.onChange}
                                        name="difficulty"
                                    />
                                </Grid>
                                <Grid xs={4} align="left">
                                    <p>Master Chef</p>
                                    <Radio
                                        checked={this.state.difficulty === 'Hard'}
                                        value={"Hard"}
                                        onChange={this.onChange}
                                        name="difficulty"
                                        style={{marginLeft: '1em'}}
                                    />
                                </Grid>


                                {/*****************Time*************/}
                                <Grid xs={12} align="center">
                                    <h2>How much time does this recipe take to make?</h2>
                                    <TextField name="time" onChange={this.onChange} style={{width: '5em'}}></TextField>
                                </Grid>

    
                                {/*****************Directions*************/}
                                <Grid xs={12}>
                                    <Directions handleDirections={this.handleDirections} deleteDirection={this.deleteDirection}></Directions>
                                </Grid>


                                {/*****************Tips*************/}
                                <Grid xs={12} style={{marginTop: '3em'}}>
                                    <Tips handleTips={this.handleTips} deleteTip={this.deleteTip}></Tips>
                                </Grid>


                                {/*****************Contributors*************/}
                                <Grid xs={12} style={{marginTop: '2em', marginLeft: '3em'}}>
                                    <h2>Contributors: <TextField name="contributors" onChange={this.onChange} style={{width: '20em'}}></TextField></h2>
                                </Grid>
                            </Grid>


                                {/* **************Source**************** */}
                            <Grid xs={12} style={{marginTop: '2em', marginLeft: '3em'}}>
                                <h2>Source: <TextField name='source' onChange={this.onChange} style={{width: '23em'}}></TextField></h2>
                            </Grid>


                            <Grid xs={12} align="center">
                                <Button type="submit" variant="outlined" style={{
                                    textTransform: 'none',
                                    fontSize: '1.2rem',
                                    width: '8em'
                                    }}>Submit!
                                </Button>
                            </Grid>
                        </form>
                    <div style={{height: '2em'}}></div>
                </Paper>
                <div style={{height: '2em'}}></div>
            </div>
        );
    }
}
 
export default ContributeRecipe;