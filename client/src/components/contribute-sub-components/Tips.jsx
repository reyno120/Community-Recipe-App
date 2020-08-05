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

    componentDidMount() {
        var inputs = [];
        for(var i = 1; i < this.props.tips.length; i++) {
            inputs.push(this.props.tips[i]);
        }
        this.setState({inputs: inputs});
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
                    <Grid item xs={2} align="center">
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


                    <Grid item xs={10} align="left">
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

                        <p style={{fontWeight: "bold", display: 'inline'}}>#1:</p>
                        {this.props.tips[0] ? (
                            <TextField value={this.props.tips[0]} onChange={this.props.handleTips(0)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                        ) : (
                            <TextField value={''} onChange={this.props.handleTips(0)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                        )}
                        

                        {this.state.inputs.map((input, index) => {
                            return (
                                <div key={index} style={{marginTop: '1em'}}>
                                    <p style={{fontWeight: "bold", display: 'inline'}}>#{index + 2}:</p>
                                    {this.props.tips[index + 1] ? (
                                        <TextField value={this.props.tips[index + 1]} onChange={this.props.handleTips(index + 1)} style={{marginLeft: '1em', width: '55em'}}></TextField>
                                    ) : (
                                        <TextField value={''} onChange={this.props.handleTips(index + 1)} style={{marginLeft: '1em', width: '55em'}}></TextField>
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
 
export default Tips;