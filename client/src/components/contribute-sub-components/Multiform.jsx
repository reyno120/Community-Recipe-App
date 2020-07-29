import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../App.css';

class Multiform extends Component {
    state = {  
        activeStep: 0,
        completed: {},
        steps: ['Select campaign settings', 'Create an ad group', 'Create an ad']
    }

    // getSteps() {
    //     return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    // }

    getStepContent(step) {
        switch (step) {
          case 0:
            return 'Step 1: Select campaign settings...';
          case 1:
            return 'Step 2: What is an ad group anyways?';
          case 2:
            return 'Step 3: This is the bit I really care about!';
          default:
            return 'Unknown step';
        }
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
                width: '100%',
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
            <div style={styles.root}>
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
            </div>
        );
    }
}
 
export default Multiform;