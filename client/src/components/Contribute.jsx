import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class Contribute extends Component {
    state = {
        file: null,
        filename: '',
        image: '',
        ingredients: []
    };

    addIngredient = () => {
        this.setState({ingredients: [...this.state.ingredients, ""]});
    }

    handleIngredients = (e, index) => {
        var ingredients = this.state.ingredients;
        ingredients[index] = (e.target.value);
        // this.state.ingredients[index] = e.target.value;
        // this.setState({ingredients: this.state.ingredients});
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
                                    <img style={{width: '50%', display: 'block'}} src={this.state.image} />
                                </Grid>
                                <Grid xs={3} align="center" style={{marginTop: '2em'}}>
                                    <h2>Nutrition:</h2>
                                    <Button variant="contained">Add Nutrition</Button>
                                </Grid>
                                <Grid xs={3} align="center" style={{marginTop: '2em'}}>
                                    <h2>Ingredients:</h2>
                                    {this.state.ingredients.map((ingredient, index) => {
                                        return (
                                            <div key={index}>
                                                <TextField onChange={this.handleIngredients} />
                                            </div>
                                        );
                                    })}
                                    <Button variant="contained" onClick={this.addIngredient} style={{marginTop: '1em'}}>Add Ingredient</Button>
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