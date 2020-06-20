import React, { Component } from 'react';
import SingleCard from './SingleCard';
import Grid from '@material-ui/core/Grid';


class Cards extends Component {
    state = {  }

    render() { 
        return (
            <div style={{marginBottom: '6em'}}>
                <h1 style={{
                    fontSize: '28px',
                    color: 'rgb(25, 26, 23)',
                    textAlign: 'left',
                    marginLeft: '1em',
                    fontFamily: 'Muli'
                }}>{this.props.header}</h1>
                <div style={{
                    color: 'rgb(25, 26, 23)',
                    backgroundColor: 'rgb(25, 26, 23)',
                    width: '95%',
                    marginLeft: '1.8em',
                    marginBottom: '2em',
                    height: '1px'
                }}>
                </div>
                <Grid container spacing={2} style={{marginLeft: '.5em'}}>
                    <Grid item xs={3}>
                        <SingleCard></SingleCard>
                    </Grid>
                    <Grid item xs={3}>
                        <SingleCard></SingleCard>
                    </Grid>
                    <Grid item xs={3}>
                        <SingleCard></SingleCard>
                    </Grid>
                    <Grid item xs={3}>
                        <SingleCard></SingleCard>
                    </Grid>
                </Grid>
            </div>  
        );
    }
}
 
export default Cards;