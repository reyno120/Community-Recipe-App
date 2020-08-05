import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Directions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directions: [],
            inputs: [],
            step: ''
        }
    }

    componentDidMount() {
        var inputs = [];
        for(var i = 1; i < this.props.directions.length; i++) {
            inputs.push(this.props.directions[i]);
        }
        this.setState({inputs: inputs})
    }

    addStep = () => {
        var inputs = this.state.inputs;
        inputs.push('');
        this.setState({inputs: inputs});
    }

    removeStep = () => {
        var inputs = this.state.inputs;
        inputs.pop();
        this.setState({inputs: inputs});
        this.props.deleteDirection();
    }

    render() { 
        return (  
            <div>
                <h2 style={{marginLeft: '2em'}}>Directions:</h2>
                
                <Grid container>
                    <Grid item xs={2} align="center">
                        <Button 
                            variant="contained"
                            style={{display: 'block'}}
                            onClick = {this.addStep}
                            >Add Step
                        </Button>
                        <Button
                            variant="contained"
                            onClick = {this.removeStep}
                            style={{display: 'inline-block', marginTop: '1em'}}
                            >Remove Step  
                        </Button>
                    </Grid>


                    <Grid item xs={10} align="left">
                        {this.state.directions.map((step, index) => {
                            return (
                                <div>
                                    <p>     
                                        <span style={{
                                                fontWeight: "bold"
                                            }}>Step {index + 1}:
                                        </span> {step}
                                    </p>
                                </div>
                            );
                        })}


                        <p style={{fontWeight: "bold", display: 'inline'}}>Step 1:</p>
                        {this.props.directions[0] ? (
                            <TextField name="step" value={this.props.directions[0]} onChange={this.props.handleDirections(0)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                        ) : (
                            <TextField name="step" value={''} onChange={this.props.handleDirections(0)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                        )}
                        

                        {this.state.inputs.map((input, index) => {
                            return (
                                <div key={index} style={{marginTop: '1em'}}>
                                    <p style={{fontWeight: "bold", display: 'inline'}}>Step {index + 2}:</p>
                                    {this.props.directions[index + 1] ? (
                                        <TextField name="step" value={this.props.directions[index + 1]} onChange={this.props.handleDirections(index + 1)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                                    ) : (
                                        <TextField name="step" value={''} onChange={this.props.handleDirections(index + 1)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                                    )}
                                </div>
                            );
                        })}
                    </Grid>

                </Grid>
            </div>
        );
    }
}
 
export default Directions;