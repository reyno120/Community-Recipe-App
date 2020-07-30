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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../App.css';


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
            return (<Button type="submit" variant="outlined" onClick={this.handleSubmit} style={{
                            textTransform: 'none',
                            fontSize: '1.2rem',
                            width: '8em'
                            }}>Submit!
                    </Button>);
          default:
            return 'Unknown step';
        }
    }

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
        console.log(allergens);
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

    nameStep = () => {
        return (
            <div style={{marginLeft: '3em', marginBottom: '2em'}}>
                <h2 style={{marginBottom: '0'}}>What is the name of your Recipe?</h2>
                <TextField name="name" onChange={this.onChange} label="Recipe Name" color="none" style={{width: '23em'}} />
                <h2 style={{marginBottom: '0'}}>Describe your Recipe:</h2>
                <TextField name="description" onChange={this.onChange} label="Description" multiline rowsMax={3} style={{width: '23em'}} />
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
        return (
            <div style={{marginBottom: '6em'}}>
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid xs={6} align="center" style={{marginTop: '2em'}}>
                            <h2>Ingredients:</h2>
                            <Select
                                isMulti
                                onChange={this.handleIngredients}
                                options={IngredientList}
                                isSearchable={true}
                            />
                        </Grid>
                        <Grid xs={6} align="center" style={{marginTop: '2em'}}>
                            <h2>Amount:</h2>
                            {this.state.ingredients.map((ingredient, index) => {
                                return (
                                    <div>
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
                                <p><span style={{fontWeight: 'bold'}}>Calories:</span> <TextField name="calories" onChange={this.onChange} color="primary" type="number" style={{width: '3em'}}/>grams</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p><span style={{fontWeight: 'bold'}}>Carbs:</span> <TextField name="carbs" onChange={this.onChange} color="primary" type="number" style={{width: '3em'}}/>grams</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p><span style={{fontWeight: 'bold'}}>Protein:</span> <TextField name="protein" onChange={this.onChange} color="primary" type="number" style={{width: '3em'}}/>grams</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p><span style={{fontWeight: 'bold'}}>Fat:</span> <TextField name="fat" onChange={this.onChange} color="primary" type="number" style={{width: '3em'}}/>grams</p>
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
            <Grid container>
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
                    <Grid xs={12} align="center">
                        <h2>How much time does this recipe take to make?</h2>
                        <TextField name="time" onChange={this.onChange} style={{width: '5em'}}></TextField>
                    </Grid>
            </Grid>
        );
    }

    directionsAndTipsStep = () => {
        return (
            <Grid container>
                <Grid xs={12}>
                    <Directions handleDirections={this.handleDirections} deleteDirection={this.deleteDirection}></Directions>
                </Grid>
                <Grid xs={12} style={{marginTop: '3em'}}>
                    <Tips handleTips={this.handleTips} deleteTip={this.deleteTip}></Tips>
                </Grid>
            </Grid>
        );
    }

    sourceStep = () => {
        return (
            <Grid container>
                <Grid xs={12} style={{marginTop: '2em', marginLeft: '3em'}}>
                    <h2>Contributors: <TextField name="contributors" onChange={this.onChange} style={{width: '20em'}}></TextField></h2>
                </Grid>
                <Grid xs={12} style={{marginTop: '2em', marginLeft: '3em'}}>
                    <h2>Source: <TextField name='source' onChange={this.onChange} style={{width: '23em'}}></TextField></h2>
                </Grid>
            </Grid>
        );
    }

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
    
    handleReset = () => {
        this.setState({activeStep: 0});
        this.setState({completed: {}});
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
                marginBottom: '1em'
              },
              backButton: {
                marginRight: '.5em',
                backgroundColor: 'rgb(254, 98, 57)',
                marginLeft: '3em',
                marginBottom: '1em'
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
                <h1 style={{color: 'black', paddingTop: '.5em'}}>Share your Delicious Recipe!</h1>
                <Stepper nonLinear activeStep={this.state.activeStep}>
                    {this.state.steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
                            <StepLabel className={{root: styles.stepIcon, active: styles.stepIcon}}>
                                {label}
                            </StepLabel>
                        </StepButton>
                    </Step>
                    ))}
                </Stepper>
                <div>
                    {this.allStepsCompleted() ? (
                    <div>
                        <Typography style={styles.instructions}>
                        All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={this.handleReset}>Reset</Button>
                    </div>
                    ) : (
                    <div>
                        <Typography className={styles.instructions}>{this.getStepContent(this.state.activeStep)}</Typography>
                        <div>
                        <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} style={styles.backButton}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.handleNext}
                            style={styles.button}
                        >
                            Next
                        </Button>
                        {this.state.activeStep !== this.state.steps.length &&
                            (this.state.completed[this.state.activeStep] ? (
                            <Typography variant="caption" style={styles.completed}>
                                Step {this.state.activeStep + 1} already completed
                            </Typography>
                            ) : (
                            <Button variant="contained" style={styles.button} onClick={this.handleComplete}>
                                {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                            </Button>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
            </Paper>
        );
    }
}
 
export default Multiform;