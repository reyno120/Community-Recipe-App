import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Comments from './Comments';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

class Recipe extends Component {
    state = {  
        recipe: [],
        comments: [],
        likeColor: 'gray',
        liked: false,
        likeCount: 0,
        bookmarkColor: 'gray',
        bookmarked: false,
        commentAuthors: [],
        expanded: false
    };

    componentDidMount() {
        axios.get('/recipes', {
            params: {
                recipeID: this.props.match.params.recipeID
            }
        })
        .then(res => {
            this.setState({recipe: res.data.recipe});
            this.setState({likeCount: res.data.recipe[0].likes});
            this.setState({comments: res.data.recipe[0].comments})

            var username = sessionStorage.getItem('username');
            if(username) {
                if(this.state.recipe[0].likedBy.includes(username, 0)) {
                    this.setState({likeColor: 'red'});
                    this.setState({liked: true});
                }

                var bookmarksString = sessionStorage.getItem('bookmarks');
                var bookmarks = bookmarksString.split(',');
                if(bookmarks.includes(this.state.recipe[0].recipeID, 0)) {
                    this.setState({bookmarkColor: 'blue'});
                    this.setState({bookmarked: true});
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleLike = () => {
        if(!this.state.liked) {
          this.setState({likeColor: 'red'});
          var username = sessionStorage.getItem('username');
    
          if(username) {
            var usersLikedRecipe = this.state.recipe[0].likedBy;
            usersLikedRecipe.push(username);
            var likes = this.state.likeCount;
            likes++;
            this.setState({likeCount: likes});
    
            axios.post('/recipe/like', {
              recipeID: this.state.recipe[0].recipeID, 
              likedBy: usersLikedRecipe,
              likes: likes
            },
            {
              headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
              }
            });
          }
        }
    }


      handleBookmark = () => {
        if(sessionStorage.getItem('token')) {
          if(!this.state.bookmarked) {  // add to bookmarks if recipe is not already bookmarked
            this.setState({bookmarkColor: 'blue'});
    
            axios.post('/recipe/bookmark', {
              recipeID: this.state.recipe[0].recipeID,
              action: 'add'
            },
            {
              headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
              }
            })
            .then((res) => {
              var bookmarks = sessionStorage.getItem('bookmarks');
              bookmarks = bookmarks + ',' + this.state.recipe[0].recipeID;
              sessionStorage.setItem('bookmarks', bookmarks);
              this.setState({bookmarked: true});
            });
          }
          else {  //remove from bookmarks if already bookmarked
            this.setState({bookmarkColor: 'gray'});
    
            var bookmarksString = sessionStorage.getItem('bookmarks');
            var bookmarks = bookmarksString.split(',');
            var index = bookmarks.indexOf(this.state.recipe[0].recipeID);
            bookmarks.splice(index, 1);
            sessionStorage.setItem('bookmarks', bookmarks);
            this.setState({bookmarked: false});
    
            console.log(bookmarks);
            console.log("posting");
            axios.post('/recipe/bookmark', {
              bookmarks: bookmarks,
              action: 'remove'
            }, 
            {
              headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
              }
            });
          }
        }
    }

    render() {

        const styles = {
            expand: {
                transform: 'rotate(0deg)'
            },
            expandOpen: {
                transform: 'rotate(180deg)'
            }
        }

        return (  
            <div>
                <Paper 
                    elevation={3} 
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto'
                    }}>
                    {this.state.recipe.map((details, index) => (
                        <div>
                            <h1 style={{
                                color: 'rgb(25, 26, 23)',
                                textDecoration: 'underline',
                                paddingTop: '.5em',
                                marginBottom: '0'
                            }}>{details.name}</h1>
                            <div style={{textAlign: 'center'}}>
                                <p style={{display: 'inline-block', fontSize: '24px'}}>Difficulty: {details.difficulty}</p>
                                <p style={{display: 'inline-block', fontSize: '24px', marginLeft: '3em' , marginBottom: '1em'}}>Time: {details.time}</p>
                            </div>
                            <img src={details.image} alt="temporary" style={{width: '40%', marginLeft: '25em', display: 'block'}} />
                            <div style={{textAlign: 'center', marginTop: '1em'}}>
                                <IconButton>
                                    <FavoriteIcon style={{color: this.state.likeColor}} onClick={this.handleLike} />
                                </IconButton>
                                <p style={{marginLeft: '-.5em', marginRight: '1em', fontSize: '18px', display: 'inline'}}>&nbsp;({this.state.likeCount})</p>
                                <IconButton>
                                    <BookmarkIcon style={{color: this.state.bookmarkColor}} onClick={this.handleBookmark} />
                                </IconButton>
                            </div>
                            <p style={{
                                fontSize: '18px',
                                margin: '1em 10em 3em 10em',  
                                textAlign: 'center',
                                }}>{details.description}</p>
                            <Grid container>
                                <Grid item xs={3} align="center">
                                    <p>Calories: {details.nutrition.calories}</p>
                                    <p>Carbs: {details.nutrition.carbs}</p>
                                    <p>Fat: {details.nutrition.fat}</p>
                                    <p>Protein: {details.nutrition.protein}</p>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <h2>Ingredients</h2>
                                    <ul style={{listStylePosition: 'inside'}}>
                                        {details.ingredients.map((value, index) => {
                                            return <li key={index}>{details.amounts[index]} {value}</li>
                                        })}
                                    </ul>
                                </Grid>
                                <Grid item xs={3} align="center">
                                    <h2>Useful tips</h2>
                                    <ul style={{listStylePosition: 'inside'}}>
                                        {details.tips.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </Grid>
                            </Grid>
                            <h2 style={{
                                fontWeight: '800', 
                                fontSize: '24px', 
                                textDecoration: 'underline',
                                marginLeft: '2em'
                                }}>Directions:</h2>
                            <ul style={{marginLeft: '2em', marginRight: '2em', listStyleType: 'decimal'}}>
                                {details.directions.map((value, index) => {
                                    return <li style={{marginBottom: '1em'}} key={index}>{value}</li>
                                })}
                            </ul>
                            <Grid container>
                                <Grid item xs={6} align="center">
                                    <p>Author: {details.author}</p>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <p>Source: {details.source}</p>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </Paper>
                <div style={{height: '2em'}}></div>

                <Paper
                    elevation={3}
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto' 
                    }}>
                    <IconButton>
                        <ExpandMoreIcon onClick={() => this.setState({expanded: !this.state.expanded})} style={this.state.expanded ? styles.expandOpen : styles.expand} />
                    </IconButton>
                    <p style={{display: 'inline'}}>{this.state.expanded ? 'Hide Comments' : 'Show Comments'}</p>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <Comments comments={this.state.comments} recipeID={this.props.match.params.recipeID}/>
                    </Collapse>  
                </Paper>
                <div style={{height: '2em'}}></div>       
            </div>
        );
    }
}
 
export default Recipe;