import React, { Component } from 'react';
import SingleCard from './SingleCard';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class Bookmarks extends Component {
    state = {  
        recipes: [],
        component: ''
    };

    componentDidMount() {
        // if user is logged in
        if(sessionStorage.getItem('token')) {
            var bookmarksString = sessionStorage.getItem('bookmarks');
            var bookmarks = bookmarksString.split(',');
            bookmarks.splice(0, 1);

            if(bookmarks.length < 1) {  // if user has no recipes bookmarked
                this.setState({component: 'no bookmarks'});
            }
            else {  // gather bookmarked recipes data
                this.setState({component: 'show bookmarks'});

                axios.post('/user/bookmarks', {
                    bookmarks: bookmarks
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                .then((res) => {
                    this.setState({recipes: res.data.recipes});
                });
            }
        }
        else {  // if user is not logged in
            this.setState({component: 'login'});
        }
    }

    // This function decides what message/bookmarks to display to the user
    componentToRender() {
        if(this.state.component === 'no bookmarks') {
            return (
                <h2>no bookmarks</h2>
            );
        }
        else if(this.state.component === 'login') {
            return (
                <h2>please login</h2>
            );
        }
        else if(this.state.component === 'show bookmarks') {
            return (
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
            );
        }
    }

    render() { 
        return (  
            <div>
                {this.componentToRender()}
            </div>
        );
    }
}
 
export default Bookmarks;