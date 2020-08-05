import React, { Component } from 'react';
import SingleCard from './SingleCard';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


class Cards extends Component {
    state = {  
        recipes: []
    };

    componentDidMount() {
        axios.get('/home', {
            params: {
                filter: this.props.filter
            }
        })
        .then(res => {
            var recipes = this.state.recipes;
            recipes.push(res.data.recipes[0]);
            recipes.push(res.data.recipes[1]);
            recipes.push(res.data.recipes[2]);
            recipes.push(res.data.recipes[3]);
            this.setState({recipes: recipes});
        })
        .catch(error => {
            console.log(error);
        });
    }
    
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
                    {this.state.recipes.map((details, index) => (
                        <Grid key={index} item xs={3}>
                            <SingleCard 
                                name={details.name}
                                description={details.description}
                                author={details.author}
                                source={details.source}
                                directions={details.directions}
                                ingredients={details.ingredients}
                                date={details.date}
                                image={details.image}
                                recipeID={details.recipeID}
                                likedBy={details.likedBy}
                                likes={details.likes}
                                authorImage={details.authorImage}
                            ></SingleCard>
                        </Grid>
                    ))}
                </Grid>
            </div>  
        );
    }
}
 
export default Cards;