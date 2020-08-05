import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Radio from '@material-ui/core/Radio';
import IngredientList from '../../data/ingredients';
import Allergens from './Allergens';
import Directions from './Directions';
import Tips from './Tips';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../App.css';
import { IconButton, DialogTitle, DialogActions, Dialog } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(254, 98, 57)'
        }
    }
}); 

class Multiform extends Component {
    state = {  
        activeStep: 0,
        completed: {},
        steps: ['Name/description', 'Image', 'Nutrition', 'Ingredients and Allergens', 'Difficulty and Time', 'Directions', 'Credit', 'Submit'],
        author: '',
        recipeID: '',
        file: null,
        filename: '',
        name: '',
        description: '',
        image: '',
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
        ingredients: [],
        allergens: ["saltFree", "oilFree", "sugarFree", "glutenFree", "nutFree", "soyFree", "peanutFree"],
        amounts: [],
        difficulty: '',
        time: 0,
        directions: [],
        tips: [],
        contributors: '',
        source: '',
        displaySuccess: 'none',
        displaySuccessEdit: 'none',
        displayContribute: 'block',
        open: false
    }

    getStepContent(step) {
        switch (step) {
          case 0:
            return this.nameStep();
          case 1:
            return this.imageStep();
          case 2:
            return this.nutritionStep();
          case 3:
            return this.ingredientsStep();
          case 4: 
            return this.difficultyAndTimeStep();
          case 5:
            return this.directionsAndTipsStep();
          case 6: 
            return this.sourceStep();
          case 7: 
            return this.submitStep();
          default:
            return 'Unknown step';
        }
    }


    componentDidMount() {
        if(this.props.recipeID) {

            axios.get('/recipes', {
                params: {
                    recipeID: this.props.recipeID
                }
            })
            .then((res) => {
                const recipe = res.data.recipe[0];
                this.setState({author: recipe.author});
                this.setState({recipeID: recipe.recipeID});
                this.setState({name: recipe.name});
                this.setState({description: recipe.description});
                this.setState({image: recipe.image});
                this.setState({filename: recipe.image});
                this.setState({calories: recipe.nutrition.calories});
                this.setState({carbs: recipe.nutrition.carbs});
                this.setState({fat: recipe.nutrition.fat});
                this.setState({protein: recipe.nutrition.protein});
                this.setState({ingredients: recipe.ingredients});
                this.setState({amounts: recipe.amounts});
                this.setState({difficulty: recipe.difficulty});
                this.setState({time: recipe.time});
                this.setState({directions: recipe.directions});
                this.setState({tips: recipe.tips});
                this.setState({contributors: recipe.contributors});
                this.setState({source: recipe.source});
                this.setState({name: recipe.name});
            });
        }
    }


    //-----------CHANGE FUNCTIONS-----------//
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    fileOnChange = (e) => {
        if(e.target.files[0]) {
            this.setState({file: e.target.files[0]});
            this.setState({filename: e.target.files[0].name});
            this.setState({image: URL.createObjectURL(e.target.files[0])});
        }
    }




    //-----------HANDLERS-----------//
    handleAmounts = (index) => (e) => {
        const { amounts } = this.state;
        const newAmounts = amounts.slice(0);
        newAmounts[index] = e.target.value;
        this.setState({amounts: newAmounts});
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

    handleSubmit = (e) => {
        // e.preventDefault();
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
        
        for(i = 0; i < this.state.allergens.length; i++) {
            data.append('allergens', this.state.allergens[i]);
        }

        for(i = 0; i < this.state.amounts.length; i++) {
            data.append('amounts', this.state.amounts[i]);
        }

        if(this.state.directions !== null) {
            for(i = 0; i < this.state.directions.length; i++) {
                data.append('directions', this.state.directions[i]);
            }
        }
        else{
            data.append('directions', []);
        }

        if(this.state.tips !== null) {
            for(i = 0; i < this.state.tips.length; i++) {
                data.append('tips', this.state.tips[i]);
            }
        }
        else {
            data.append('tips', []);
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


    // same thing as handleSubmit but we call updateOne rather than create
    // in mongoose
    handleEdit = () => {
        const data = new FormData();

        data.append('file', this.state.file);
        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('recipeID', this.state.recipeID);
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
        data.append('update', 'true');

        for(var i = 0; i < this.state.ingredients.length; i++) {
            data.append('ingredients', this.state.ingredients[i]);
        }
        
        for(i = 0; i < this.state.allergens.length; i++) {
            data.append('allergens', this.state.allergens[i]);
        }

        for(i = 0; i < this.state.amounts.length; i++) {
            data.append('amounts', this.state.amounts[i]);
        }

        if(this.state.directions !== null) {
            for(i = 0; i < this.state.directions.length; i++) {
                data.append('directions', this.state.directions[i]);
            }
        }
        else {
            data.append('directions', []);
        }
        

        if(this.state.tips !== null) {
            for(i = 0; i < this.state.tips.length; i++) {
                data.append('tips', this.state.tips[i]);
            }
        }
        else {
            data.append('tips', []);
        }
        
    
        axios.post('/recipeUpload', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
        .then((res) => {
            this.setState({displaySuccessEdit: 'block'});
            this.setState({displayContribute: 'none'});
        });
    }



    //-----------STEPS-----------//
    nameStep = () => {
        return (
            <div style={{marginLeft: '3em', marginBottom: '2em'}}>
                <ThemeProvider theme={theme}>
                    <h2 style={{marginBottom: '0'}}>What is the name of your Recipe?</h2>
                    <TextField name="name" value={this.state.name} onChange={this.onChange} label="Recipe Name" color="primary" style={{width: '23em'}} />
                    <h2 style={{marginBottom: '0'}}>Describe your Recipe:</h2>
                    <TextField name="description" value={this.state.description} onChange={this.onChange} color="primary" label="Description" multiline rowsMax={3} style={{width: '23em'}} />
                </ThemeProvider>
            </div>
        );
    }

    imageStep = () => {
        return (
            <div>
                <h2 style={{marginLeft: '3em'}}>Upload an image:</h2>
                <Button component="label" variant="outlined" style={{marginBottom: '2em', marginLeft: '8em'}}>
                    Upload
                    <input type='file' 
                           style={{display: 'none'}} 
                           name="file" 
                           id='customImage' 
                           onChange={this.fileOnChange}>
                    </input>
                </Button>
                <label htmlFor='customImage'>{this.filename}</label>
                <img style={{width: '50%', display: 'block', margin: 'auto', marginBottom: '10em'}} src={this.state.image} alt={''}/>
            </div>
        );
    }

    ingredientsStep = () => {
        var ingr = [];
        for(var i = 0; i < this.state.ingredients.length; i++) {
            ingr.push({value: this.state.ingredients[i], label: this.state.ingredients[i]});
        }

        return (
            <div style={{marginBottom: '6em'}}>
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid item xs={6} align="center" style={{marginTop: '2em'}}>
                            <h2>Ingredients:</h2>
                            <Select
                                isMulti
                                onChange={this.handleIngredients}
                                options={IngredientList}
                                isSearchable={true}
                                defaultValue={ingr}
                            />
                        </Grid>
                        <Grid item xs={6} align="center" style={{marginTop: '2em'}}>
                            <h2>Amount:</h2>
                            {this.state.ingredients.map((ingredient, index) => {
                                return (
                                    <div key={index}>
                                        <p style={{
                                            fontSize: '18px',
                                            display: 'inline' 
                                            }}>{ingredient}: </p>
                                        <TextField onChange={this.handleAmounts(index)} color="primary" style={{width: '5em'}}/>
                                    </div>
                                );
                            })}
                        </Grid> 
                        <Grid item xs={12}>
                            <Allergens ingredients={this.state.ingredients} handleAllergens={this.handleAllergens}></Allergens>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        );
    }

    nutritionStep = () => {
        return (
            <div style={{marginLeft: '3em'}}>
                <h2>Enter nutrition information:</h2>
                <div>
                    <div style={{height: '2em'}}></div>
                    <ThemeProvider theme={theme}>
                        <Grid container>
                            <Grid item xs={3}>
                                <div>
                                    <p style={{fontWeight: 'bold', display: 'inline'}}>Calories:</p>
                                    <TextField 
                                        name="calories" 
                                        onChange={this.onChange} 
                                        color="primary" 
                                        type="number" 
                                        inputProps={{min: 0}} 
                                        style={{width: '3em'}}
                                        value={this.state.calories}
                                    />grams
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <p style={{fontWeight: 'bold', display: 'inline'}}>Carbs:</p>
                                    <TextField 
                                        name="carbs" 
                                        onChange={this.onChange} 
                                        color="primary" 
                                        type="number" 
                                        inputProps={{min: 0}} 
                                        style={{width: '3em'}}
                                        value={this.state.carbs}
                                    />grams
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <p style={{fontWeight: 'bold', display: 'inline'}}>Protein:</p>
                                    <TextField 
                                        name="protein" 
                                        onChange={this.onChange} 
                                        color="primary" 
                                        type="number" 
                                        inputProps={{min: 0}} 
                                        style={{width: '3em'}}
                                        value={this.state.protein}
                                    />grams
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <p style={{fontWeight: 'bold', display: 'inline'}}>Fat:</p>
                                    <TextField 
                                        name="fat" 
                                        onChange={this.onChange} 
                                        color="primary" 
                                        type="number" 
                                        inputProps={{min: 0}} 
                                        style={{width: '3em'}}
                                        value={this.state.fat}
                                    />grams
                                </div>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                    <div style={{height: '4em'}}></div>
                </div>
            </div>
        );
    }

    difficultyAndTimeStep = () => {
        return (
            <ThemeProvider theme={theme}>
                <Grid container>
                    <Grid item xs={12} align="center">
                        <h2 style={{marginTop: '3em'}}>Who is this recipe for?</h2>
                    </Grid>
                    <Grid item xs={4} align="right">
                        <p>Beginner Sous Chef</p>
                        <Radio
                            checked={this.state.difficulty === 'Easy'}
                            value={"Easy"}
                            color="primary"
                            onChange={this.onChange}
                            name="difficulty"
                            style={{marginRight: '2em'}}
                        />
                        </Grid>
                        <Grid item xs={4} align="center">
                            <p>Experienced Cook</p>
                            <Radio
                                checked={this.state.difficulty === 'Medium'}
                                value={"Medium"}
                                color="primary"
                                onChange={this.onChange}
                                name="difficulty"
                            />
                        </Grid>
                        <Grid item xs={4} align="left">
                            <p>Master Chef</p>
                            <Radio
                                checked={this.state.difficulty === 'Hard'}
                                value={"Hard"}
                                color="primary"
                                onChange={this.onChange}
                                name="difficulty"
                                style={{marginLeft: '1em'}}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <h2>How much time does this recipe take to make?</h2>
                            <TextField name="time" value={this.state.time} type="number" inputProps={{min: 0}} onChange={this.onChange} style={{width: '3em'}} />
                            <p style={{display: 'inline'}}>minutes</p>
                        </Grid>
                </Grid>
            </ThemeProvider>
        );
    }

    directionsAndTipsStep = () => {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Directions directions={this.state.directions} handleDirections={this.handleDirections} deleteDirection={this.deleteDirection}></Directions>
                </Grid>
                <Grid item xs={12} style={{marginTop: '3em'}}>
                    <Tips tips={this.state.tips} handleTips={this.handleTips} deleteTip={this.deleteTip}></Tips>
                </Grid>
            </Grid>
        );
    }

    sourceStep = () => {
        return (
            <Grid container>
                <Grid item xs={12} style={{marginTop: '2em', marginLeft: '3em'}}>
                    <h2>Contributors: <TextField name="contributors" value={this.state.contributors} onChange={this.onChange} style={{width: '20em'}}></TextField></h2>
                </Grid>
                <Grid item xs={12} style={{marginTop: '2em', marginLeft: '3em'}}>
                    <h2>Source: <TextField name='source' value={this.state.source} onChange={this.onChange} style={{width: '23em'}}></TextField></h2>
                </Grid>
            </Grid>
        );
    }

    submitStep = () => {
        const pStyle = {
            marginLeft: '3em',
            display: 'inline'
        };
        return (
            <div style={{marginLeft: '3em'}}>
                <h2>Your Recipe:</h2>
                <div style={{marginLeft: '2em'}}>
                    <p>Name: {this.state.name}</p>
                    <p>Description: {this.state.description}</p>
                    <p>Image: {this.state.filename}</p>
                    <p>Nutrition: </p>
                        <p style={pStyle}>Calories: {this.state.calories}kcal</p>
                        <p style={pStyle}>Carbs: {this.state.carbs}g</p>
                        <p style={pStyle}>Protein: {this.state.protein}g</p>
                        <p style={pStyle}>Fat: {this.state.fat}g</p>
                    <p>Ingredients:</p>
                    <ul style={{listStyleType: 'none'}}>{this.state.ingredients.map((ingredient, i) => {
                        return (
                            <li key={i}>{ingredient}, {this.state.amounts[i]}</li>
                        );
                    })}</ul>
                    <p>Allergens: </p>
                    <ul style={{listStyleType: 'none'}}>{this.state.allergens.map((allergen, i) => {
                        return (
                            <li key={i}>{allergen}</li>
                        );
                    })}</ul>
                    <p>Difficulty: {this.state.difficulty}</p>
                    <p>Time: {this.state.time} minutes</p>
                    <p>Directions: </p>
                    {this.state.directions !== null ? (
                        <ul style={{listStyleType: 'none'}}>{this.state.directions.map((direction, i) => {
                            return (
                                <li key={i}>{i+ 1}.{direction}</li>
                            );
                    })}</ul>
                    ) : (
                        <div></div>
                    )}
                    <p>Tips: </p>
                    {this.state.tips !== null ? (
                        <ul style={{listStyleType: 'none'}}>{this.state.tips.map((tip, i) => {
                            return (
                                <li key={i}>{i+ 1}.{tip}</li>
                            );
                    })}</ul>
                    ) : (
                        <div></div>
                    )}
                    <p>Contributors: {this.state.contributors}</p>
                    <p>Source: {this.state.source}</p>
                </div>
            </div>
        );
    }



    //-----------STEPPER FUNCTIONS-----------//
    totalSteps = () => {
        return this.state.steps.length;
    };
    
    completedSteps = () => {
        return this.state.completed.length;
    };
    
    isLastStep = () => {
        return this.state.activeStep === this.totalSteps() - 1;
    };
    
    allStepsCompleted = () => {
        return this.completedSteps() === this.totalSteps();
    };
    
    handleNext = () => {
        const newActiveStep =
          this.isLastStep() && !this.allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              this.state.steps.findIndex((step, i) => !(i in this.state.completed))
            : this.state.activeStep + 1;
        this.setState({activeStep: newActiveStep});
    };
    
    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1});
    };
    
    handleStep = (step) => () => {
        this.setState({activeStep: step});
    };
    
    handleComplete = () => {
        const newCompleted = this.state.completed;
        newCompleted[this.state.activeStep] = true;
        this.setState({completed: newCompleted});
        this.handleNext();
    };
    
    handleDelete = () => {
        axios.post('/recipe/delete', {
            recipeID: this.state.recipeID
        },
        {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log("test");
            window.location.replace("/contribute");
        });
    };

    render() { 

        const styles = {
            root: {
                width: '1366px',
                margin: 'auto',
                backgroundColor: 'rgb(228, 221, 211)'
              },
              button: {
                marginRight: '.5em',
                backgroundColor: 'rgb(254, 98, 57)',
                marginBottom: '1em',
                marginTop: '3em'
              },
              backButton: {
                marginRight: '.5em',
                backgroundColor: 'rgb(254, 98, 57)',
                marginLeft: '3em',
                marginBottom: '1em',
                marginTop: '3em'
              },
              completed: {
                display: 'inline-block',
              },
              instructions: {
                // marginTop: theme.spacing(1),
                // marginBottom: theme.spacing(1),
              },
              stepIcon: {
                    color: 'rgb(254, 98, 57) !important',
                    fill: 'rgb(254, 98, 57)'
              }
        }

        return (  
            <Paper style={styles.root}>
                <div style={{display: this.state.displayContribute}}>
                    {this.props.edit ? (
                        <Grid container style={{marginTop: '2em'}}>  
                            <Grid item xs={10}>
                                <h2 style={{paddingTop: '.5em', marginLeft: '1.5em'}}>Edit your recipe</h2>
                            </Grid>
                            <Grid item xs={2} align="center" style={{marginTop: '.5em'}}>
                                <IconButton>
                                    <DeleteForeverIcon onClick={() => this.setState({open: true})} style={{fill: 'red', width: '40px', height: '40px'}}></DeleteForeverIcon>
                                </IconButton>
                            </Grid>
                        </Grid>
                    ) : (
                        <h1 style={{color: 'black', paddingTop: '.5em'}}>Share your Delicious Recipe!</h1>
                    )}
                    <Stepper nonLinear activeStep={this.state.activeStep}>
                        {this.state.steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
                                <StepLabel inputprops={{root: styles.stepIcon, active: styles.stepIcon}}>
                                    {label}
                                </StepLabel>
                            </StepButton>
                        </Step>
                        ))}
                    </Stepper>
                    <div>
                        {this.allStepsCompleted() ? (
                        <div>
                            {/* <Typography style={styles.instructions}>
                            All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={this.handleReset}>Reset</Button> */}
                        </div>
                        ) : (
                        <div>
                            <Typography component="div" >{this.getStepContent(this.state.activeStep)}</Typography>
                            <div>
                            <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} style={styles.backButton}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={this.handleNext}
                                style={styles.button}
                                disabled={this.state.activeStep === 7}
                            >
                                Next
                            </Button>
                                {this.state.activeStep === 7 ? (
                                    this.props.edit ? 
                                    // if editing hit this submit button
                                        <Button variant="contained" style={styles.button} onClick={this.handleEdit}>
                                            Submit
                                        </Button>
                                    :
                                    // if first contribute, hit this submit button
                                        <Button variant="contained" style={styles.button} onClick={this.handleSubmit}>
                                            Submit
                                        </Button>
                                ) : (
                                    <Button variant="contained" disabled style={styles.button} >
                                        Submit
                                    </Button>)}
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <div style={{display: this.state.displaySuccess}}>
                    <h2>Your recipe has been successfully uploaded!</h2>
                </div>
                <div style={{display: this.state.displaySuccessEdit}}>
                    <h2>Your recipe has been successfully updated!</h2>
                </div>
                <Dialog onClose={() => {this.setState({open: false})}} open={this.state.open}>
                    <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
                    <DialogActions style={{margin: 'auto'}}>
                        <Button onClick={this.handleDelete}>Yes</Button>
                        <Button onClick={() => {this.setState({open: false})}}>No</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}
 
export default Multiform;