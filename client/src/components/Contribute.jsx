import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IngredientList from '../data/ingredients';
import Select from 'react-select';
import Radio from '@material-ui/core/Radio';

class Contribute extends Component {
    state = {
        file: null,
        filename: '',
        image: '',
        ingredients: [],
        selectedIngredient: '',
        nutritionDisplay: 'none',
        dispButton: 'block',
        radioValue: '',
        directions: []
    };

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

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('file', this.state.file);
    
        axios.post('/imageUpload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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
        console.log(this.state.ingredients);
        return (  
            <div>
                <Paper 
                    elevation={3} 
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto'
                    }}>
                        <h1 style={{
                                color: 'rgb(25, 26, 23)',
                                paddingTop: '.5em',
                                marginBottom: '1em'
                            }}>Share your Delicious Recipe!</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container>
                                <Grid item xs={6} align="center">
                                    <h2 style={{marginBottom: '0'}}>What is the name of your Recipe?</h2>
                                    <TextField label="Recipe Name" color="none" style={{width: '23em'}} />
                                    <h2 style={{marginBottom: '0'}}>Describe your Recipe:</h2>
                                    <TextField label="Description" multiline rowsMax={3} style={{width: '23em'}} />
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
                                <Grid xs={4} align="center" style={{marginTop: '2em'}}>
                                    <h2>Nutrition:</h2>
                                    <Button 
                                        variant="contained" 
                                        style={{display: this.state.dispButton}}
                                        onClick={() => {this.setState({nutritionDisplay: 'block', dispButton: 'none'})}}>
                                        Add Nutrition
                                    </Button>
                                    <div style={{display: this.state.nutritionDisplay}}>
                                        <p>Calories: <TextField style={{width: '3em'}}/></p>
                                        <p>Carbs: <TextField style={{width: '3em'}}/></p>
                                        <p>Protein: <TextField style={{width: '3em'}}/></p>
                                        <p>Fat: <TextField style={{width: '3em'}}/></p>
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
                                                <TextField style={{width: '5em'}}/>
                                            </div>
                                        );
                                    })}
                                </Grid>
                                <Grid xs={12} align="center">
                                    <h2 style={{marginTop: '3em'}}>Who is this recipe for?</h2>
                                </Grid>
                                <Grid xs={4} align="right">
                                    <p>Beginner Sous Chef</p>
                                    <Radio
                                        checked={this.state.radioValue === 'Easy'}
                                        value={"Easy"}
                                        onChange={this.onChange}
                                        name="radioValue"
                                        style={{marginRight: '2em'}}
                                    />
                                </Grid>
                                <Grid xs={4} align="center">
                                    <p>Experienced Cook</p>
                                    <Radio
                                        checked={this.state.radioValue === 'Medium'}
                                        value={"Medium"}
                                        onChange={this.onChange}
                                        name="radioValue"
                                    />
                                </Grid>
                                <Grid xs={4} align="left">
                                    <p>Master Chef</p>
                                    <Radio
                                        checked={this.state.radioValue === 'Hard'}
                                        value={"Hard"}
                                        onChange={this.onChange}
                                        name="radioValue"
                                        style={{marginLeft: '1em'}}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <h2>Directions:</h2>
                                    {this.directions.map((step, index) => {

                                    })}
                                </Grid>
                            </Grid>
                        </form>
                        <div style={{height: '2em'}}></div>
                </Paper>
            </div>
        );
    }
}
 
export default Contribute;