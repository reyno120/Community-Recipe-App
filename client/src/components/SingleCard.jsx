import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
// import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
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
      bookmarked: false
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
      var bookmarksString = sessionStorage.getItem('bookmarks');
      if(bookmarksString !== '') {
        var bookmarks = bookmarksString.split(',');
        bookmarks.splice(0, 1);   // first element is empty, so remove it

        if(bookmarks.includes(this.props.recipeID)) {
          this.setState({bookmarked: true});
          this.setState({bookmarkColor: 'blue'});
        }
      }
    }
  }

  handleLike = () => {
    if(sessionStorage.getItem('token')) {
      if(!this.state.liked) {

        // change like state
        this.setState({likeColor: 'red'});
        this.setState({liked: true});

        // change likes and add user to likedBy
        var username = sessionStorage.getItem('username');
        var usersLikedRecipe = this.props.likedBy;
        usersLikedRecipe.push(username);
        var likes = this.state.likeCount;
        likes++;
        this.setState({likeCount: likes});
  
        // post new data
        axios.post('/recipe/like', {
          recipeID: this.props.recipeID, 
          likedBy: usersLikedRecipe,
          likes: likes
        },
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        });
      }
      else {  // for unliking

        // set like state and update # of likes
        this.setState({likeColor: 'gray'});
        this.setState({liked: false});
        var likes = this.state.likeCount;
        likes--;
        this.setState({likeCount: likes});
  
        // update likedBy
        var likedBy = this.props.likedBy;
        var index = likedBy.indexOf(sessionStorage.getItem('username'));
        likedBy.splice(index, 1);
  
        // post new data
        axios.post('/recipe/like', {
          recipeID: this.props.recipeID,
          likes: likes,
          likedBy: likedBy
        },
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        });
      }
    }
    else {
      alert("You must be logged in to use this feature");
    }
  }

  handleShare = () => {
    this.setState({shareColor: 'blue'});
  }

  handleBookmark = () => {
    if(sessionStorage.getItem('token')) {
      if(!this.state.bookmarked) {  // add to bookmarks if recipe is not already bookmarked
        this.setState({bookmarkColor: 'blue'});

        axios.post('/recipe/bookmark', {
          recipeID: this.props.recipeID,
          action: 'add'
        },
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
          }
        })
        .then((res) => {
          var bookmarks = sessionStorage.getItem('bookmarks');
          bookmarks = bookmarks + ',' + this.props.recipeID;
          sessionStorage.setItem('bookmarks', bookmarks);
          this.setState({bookmarked: true});
        });
      }
      else {  //remove from bookmarks if already bookmarked
        this.setState({bookmarkColor: 'gray'});

        var bookmarksString = sessionStorage.getItem('bookmarks');
        var bookmarks = bookmarksString.split(',');
        var index = bookmarks.indexOf(this.props.recipeID);
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
    else {
      alert("You must be logged in to save recipes");
    }
  }

  handleImageClick = () => {
    var link = `/recipes/${this.props.recipeID}`;
    window.location.replace(link);
  }

  render() { 
      return (  
      <Card style={{maxWidth: 300}}>
          <CardHeader
              avatar={
                <Link to={`/users/${this.props.author}`}>
                  <Avatar alt={this.props.author} src={this.props.authorImage}/>
                </Link>
              }
              action={
                sessionStorage.getItem('username') === this.props.author ? (
                  <IconButton size="small">
                    <Link to={`/user/recipes/edit/${this.props.recipeID}`}>
                      <EditIcon></EditIcon>
                    </Link>
                  </IconButton>
                ) : (
                  <div></div>
                )
              }
              title={<Link to={`/recipes/${this.props.recipeID}`}>{this.props.name}</Link>}
              subheader={<Link to={`/users/${this.props.author}`}>{this.props.author}</Link>}
            />
            <CardMedia
              style={{height: 0, paddingTop: '56.25%', cursor: 'pointer'}}
              image={this.props.image}
              title={this.props.name}
              onClick={this.handleImageClick}
            />
            <CardContent>
              <Typography variant="body2" color="textPrimary" component="p">
                {this.props.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon onClick={this.handleLike} style={{color: this.state.likeColor}} />
                <div style={{fontSize: '16px', color: 'gray'}}>&nbsp;({this.state.likeCount})</div>
              </IconButton>
              {/* <IconButton>
                <ChatIcon />
              </IconButton> */}
              {/* <IconButton aria-label="share">
                <ShareIcon onClick={this.handleShare} style={{color: this.state.shareColor}} />
              </IconButton> */}
              <IconButton style={{marginLeft: 'auto'}}>
                  <BookmarkIcon onClick={this.handleBookmark} style={{color: this.state.bookmarkColor}}></BookmarkIcon>
              </IconButton>
            </CardActions>
        </Card>
      );
    }
}
 
export default SingleCard;