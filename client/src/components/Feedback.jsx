import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(254, 98, 57)'
        }
    }
}); 

class Feedback extends Component {
    state = { 
        bugs: '',
        featuresLiked: '',
        featuresMissing: '',
        improvements: '',
        other: '',
        displaySuccess: 'none',
        displayFeedback: 'block'
    }

    handleSubmit = () => {
        axios.post('/feedback', {
            bugs: this.state.bugs,
            featuresLiked: this.state.featuresLiked,
            featuresMissing: this.state.featuresMissing,
            improvements: this.state.improvements,
            other: this.state.other
        })
        .then((res) => {
            this.setState({displaySuccess: 'block'});
            this.setState({displayFeedback: 'none'});
        })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() { 
        return (  
            <div>
                <div style={{textAlign: 'center', display: this.state.displayFeedback}}>
                    <ThemeProvider theme={theme}>
                        <Paper 
                            elevation={3} 
                            style={{
                                backgroundColor: 'rgb(228, 221, 211)',
                                width: '1366px',
                                margin: 'auto'
                            }}
                        >
                            <h2 style={{fontSize: '28px', paddingTop: '1em'}}>Any and all feedback is encouraged and appreciated!</h2>
                            <p>(Your feedback is totally anonymous)</p>
                            <h2 style={{marginTop: '5em'}}>Any bugs or errors?</h2>
                            <OutlinedInput name="bugs" color="primary" multiline onChange={this.onChange} style={{width: '40em'}}></OutlinedInput>
                            <h2 style={{marginTop: '3em'}}>What features did you like the most?</h2>
                            <OutlinedInput name="featuresLiked" color="primary" multiline onChange={this.onChange} style={{width: '40em'}}></OutlinedInput>
                            <h2 style={{marginTop: '3em'}}>What feature(s) were missing and you would like to see added?</h2>
                            <OutlinedInput name="featuresMissing" color="primary" multiline onChange={this.onChange} style={{width: '40em'}}></OutlinedInput>
                            <h2 style={{marginTop: '3em'}}>What feature(s) do you think need improvement and what are those improvements?</h2>
                            <OutlinedInput name="improvements" color="primary" multiline onChange={this.onChange} style={{width: '40em'}}></OutlinedInput>
                            <h2 style={{marginTop: '3em'}}>Anything else you would like to mention?</h2>
                            <OutlinedInput name="other" color="primary" multiline onChange={this.onChange} style={{width: '40em', marginBottom: '2em'}}></OutlinedInput>
                            <Button onClick={this.handleSubmit} color="primary" variant="contained" style={{display: 'block', margin: 'auto'}}>Submit</Button>
                            <div style={{height: '2em'}}></div>
                        </Paper>
                        <div style={{height: '2em'}}></div>
                    </ThemeProvider>
                </div>
                <h2 style={{display: this.state.displaySuccess}}>Your feedback has been sent. Thank you!</h2>
            </div>
        );
    }
}
 
export default Feedback;