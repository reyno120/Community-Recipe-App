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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../App.css';


class Multiform extends Component {
    state = {  
        activeStep: 2,
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
        protein: ''
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
            return 'ingredients/allergens/amounts'
          case 4: 
            return 'difficulty/time'
          case 5:
            return 'directions/tips'
          case 6: 
            return 'contributors/source'
          case 7: 
            return 'submit'
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

    nutritionStep = () => {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: 'rgb(254, 98, 57)'
                }
            }
        }); 

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
                backgroundColor: 'rgb(254, 98, 57)'
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
                        <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} style={styles.button}>
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