import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tabs from './Tabs';
import Grid from '@material-ui/core/Grid';
import SingleCard from './SingleCard';

class Profile extends Component {
    state = {  
        username: '',
        image: '',
        followers: [],
        following: [],
        recipes: []
    }

    componentDidMount() {
        axios.get('/users', {
            params: {
                username: this.props.match.params.username
            }
        })
        .then((res) => {
            this.setState({username: res.data.username});
            this.setState({image: res.data.image});
            this.setState({followers: res.data.followers});
            this.setState({following: res.data.following});
            this.setState({recipes: res.data.recipes});
        })
        .catch(error => {
            console.log(error);
        });
    }

    displayFollowButton = () => {
        if(this.state.followers.includes(sessionStorage.getItem('username'))) {
            return (
                <Button variant="contained" onClick={this.handleUnfollow} style={{
                    backgroundColor: 'rgb(254, 98, 57)', 
                    marginLeft: '36em', 
                    marginTop: '3em', 
                    textTransform: 'none', 
                    fontSize: '1.1rem'}}>
                    Unfollow
                </Button>
            );
        }
        else if(this.state.username === sessionStorage.getItem('username')) {
            return (
                <Button variant="contained" disabled onClick={this.handleFollow} style={{
                    backgroundColor: 'rgb(254, 98, 57)', 
                    marginLeft: '36em', 
                    marginTop: '3em', 
                    textTransform: 'none', 
                    fontSize: '1.1rem'}}>
                    Follow +
                </Button>
            );
        }
        else {
            return (
                <Button variant="contained" onClick={this.handleFollow} style={{
                    backgroundColor: 'rgb(254, 98, 57)', 
                    marginLeft: '36em', 
                    marginTop: '3em', 
                    textTransform: 'none', 
                    fontSize: '1.1rem'}}>
                    Follow +
                </Button>
            );
        }
    }

    handleFollow = () => {
        var username = sessionStorage.getItem('username');
        if(username) {
            axios.post('/follow', {
                userProfile: this.state.username
            },
            {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            });
        }
        else {
            alert("You must be logged in to follow other users");
        }
    }

    handleUnfollow = () => {

    }


    render() { 
        return (  
            <div>
                <Paper 
                    elevation={3} 
                    style={{
                        backgroundColor: 'rgb(228, 221, 211)',
                        width: '1366px',
                        margin: 'auto'
                    }}
                >
                    <h2 style={{textAlign: 'center', paddingTop: '1em', fontSize: '2rem'}}>{this.state.username}</h2>
                    <Avatar alt="name" style={{width: '12em', height: '12em', margin: 'auto', marginTop: '2em'}} src={this.state.image} />
                    {this.displayFollowButton()}

                    <Tabs following={this.state.following} followers={this.state.followers}></Tabs>
                    <div style={{height: '7em'}}></div>
                    <h2 style={{marginLeft: '1em'}}>{this.state.username}'s recipes</h2>
                    <Grid container spacing={2} style={{marginLeft: '.5em'}}>
                        {this.state.recipes.map((details, index) => (
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
                                ></SingleCard>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
                <div style={{height: '2em'}}></div>
            </div>
        );
    }
}
 
export default Profile;