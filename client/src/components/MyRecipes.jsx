import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import SingleCard from '../components/SingleCard';

class MyRecipes extends Component {
    state = {  
        recipes: []
    }

    componentDidMount() {
        var username = sessionStorage.getItem('username');
        if(username) {
            axios.get('/myrecipes', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then((res) => {
                this.setState({recipes: res.data.recipes});
            });
        }
    }

    render() { 
        return (  
            <div>
                {this.state.recipes.length > 0 ? (
                    <Grid container spacing={2} style={{justifyContent: 'center', margin: '2em auto auto auto', width: '1366px'}}>
                        {this.state.recipes.map((details, index) => {
                            return (
                                <Grid item xs={3}>
                                    <SingleCard
                                        key={index}
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
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                ) : (
                    <h2>You do not have an recipes. Click "Contribute" to create a recipe!</h2>
                )}
            </div>
        );
    }
}
 
export default MyRecipes;