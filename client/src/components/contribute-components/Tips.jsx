import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Tips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: [],
            inputs: []
        }
    }

    addTip = () => {
        var inputs = this.state.inputs;
        // inputs.push(<TextField onChange={this.props.handleTips(inputs.length + 1)} style={{marginLeft: '1em', width: '55em'}}></TextField>);
        inputs.push('');
        this.setState({inputs: inputs});
    }

    removeTip = () => {
        var inputs = this.state.inputs;
        inputs.pop();
        this.setState({inputs: inputs});
        this.props.deleteTip();
    }

    render() { 
        return (  
            <div>
                <h2 style={{marginLeft: '2em'}}>Tips:</h2>
                
                <Grid container>
                    <Grid xs={2} align="center">
                        <Button 
                            variant="contained"
                            style={{display: 'block'}}
                            onClick = {this.addTip}
                            >Add tip
                        </Button>
                        <Button
                            variant="contained"
                            onClick = {this.removeTip}
                            style={{display: 'inline-block', marginTop: '1em'}}
                            >Remove tip  
                        </Button>
                    </Grid>


                    <Grid xs={10} align="left">
                        {this.state.tips.map((tip, index) => {
                            return (
                                <div>
                                    <p>     
                                        <span style={{
                                                fontWeight: "bold"
                                            }}>#{index + 1}:
                                        </span> {tip}
                                    </p>
                                </div>
                            );
                        })}

                        <p style={{fontWeight: "bold"}}>#1: 
                                    <TextField onChange={this.props.handleTips(0)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                        </p>

                        {this.state.inputs.map((input, index) => {
                            return (
                                <p style={{fontWeight: "bold"}}>#{index + 2}: 
                                    <TextField onChange={this.props.handleTips(index + 1)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                                </p>
                            );
                        })}
                    </Grid>

                </Grid>
            </div>
        );
    }
}
 
export default Tips;