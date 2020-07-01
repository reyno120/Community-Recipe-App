import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Directions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directions: [],
            inputs: []
        }
    }

    addStep = () => {
        var inputs = this.state.inputs;
        inputs.push(<TextField style={{marginLeft: '1em', width: '55em'}}></TextField>);
        this.setState({inputs: inputs});
    }

    removeStep = () => {
        var inputs = this.state.inputs;
        inputs.pop();
        this.setState({inputs: inputs});
    }

    render() { 
        return (  
            <div>
                <h2 style={{marginLeft: '2em'}}>Directions:</h2>
                
                <Grid container>
                    <Grid xs={2} align="center">
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


                    <Grid xs={10} align="left">
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

                        <p style={{fontWeight: "bold"}}>Step 1: 
                                    <TextField style={{marginLeft: '1em', width: '55em'}}></TextField>
                        </p>

                        {this.state.inputs.map((input, index) => {
                            return (
                                <p style={{fontWeight: "bold"}}>Step {index + 2}: 
                                    <TextField style={{marginLeft: '1em', width: '55em'}}></TextField>
                                </p>
                            );
                        })}
                    </Grid>

                </Grid>
            </div>
        );
    }
}
 
export default Directions;