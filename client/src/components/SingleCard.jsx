import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from 'react-router-dom';
import axios from 'axios';


class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      likeColor: 'gray',
      liked: false,
      likeCount: this.props.likes,
      shareColor: 'gray',
      bookmarkColor: 'gray',
      bookmarked: false,
      bookmarks: []
    }
  }

  componentDidMount() {
    // See which recipes user has already liked, liked recipes are stored
    // in recipes collection
    var username = sessionStorage.getItem('username');

    if(username) {
      if(this.props.likedBy.includes(username, 0)) {
        this.setState({liked: true});
        this.setState({likeColor: 'red'});
      }
    
      // See which recipes user has bookmarked, bookmarked recipes are stored,
      // with each user in user collection
      // avoiding doing it in here cause that would result in a lot of get request
      // axios.get('user/bookmarks', {
      //   headers: {
      //     'Authorization': 'Bearer ' + localStorage.getItem('token')
      //   }
      // })
      // .then((res) => {
      //   this.setState({bookmarks: res.data.bookmarks});
      // });
    }
  }

  handleLike = () => {
    if(!this.state.liked) {
      this.setState({likeColor: 'red'});
      var username = sessionStorage.getItem('username');

      if(username) {
        var usersLikedRecipe = this.props.likedBy;
        usersLikedRecipe.push(username);
        var likes = this.state.likeCount;
        likes++;
        this.setState({likeCount: likes});

        axios.post('/recipe/like', {
          recipeID: this.props.recipeID, 
          likedBy: usersLikedRecipe,
          likes: likes
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
      }
    }
  }

  handleShare = () => {
    this.setState({shareColor: 'blue'});
  }

  handleBookmark = () => {
    this.setState({bookmarkColor: 'blue'});

    if(sessionStorage.getItem('token') || !this.state.bookmarked) {
      axios.post('/recipe/bookmark', {
        recipeID: this.props.recipeID
      },
      {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      });
    }

  }

  render() { 
      return (  
      <Card style={{maxWidth: 300}}>
          <CardHeader
              avatar={
                <Avatar aria-label="recipe" style={{backgroundColor: red[500]}}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={<Link to={`/recipes/${this.props.recipeID}`}>{this.props.name}</Link>}
              subheader={this.props.author}
            />
            <CardMedia
              style={{height: 0, paddingTop: '56.25%'}}
              image={this.props.image}
              title={this.props.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon onClick={this.handleLike} style={{color: this.state.likeColor}} />
                <div style={{fontSize: '16px', color: 'gray'}}>&nbsp;({this.state.likeCount})</div>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon onClick={this.handleShare} style={{color: this.state.shareColor}} />
              </IconButton>
              <IconButton style={{marginLeft: 'auto'}}>
                  <BookmarkIcon onClick={this.handleBookmark} style={{color: this.state.bookmarkColor}}></BookmarkIcon>
              </IconButton>
            </CardActions>
        </Card>
      );
    }
}
 
export default SingleCard;