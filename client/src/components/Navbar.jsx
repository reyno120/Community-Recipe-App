import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ReactComponent as Broccoli } from '../images/broccoli.svg';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginLeft: '3em'
  },
  image: {
      fill: 'green'
  },
  button: {
    color: "inherit" ,
    position: 'absolute', 
    right: '0', 
    marginRight: '2em'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: 'rgb(228, 221, 211)', color: 'rgb(25, 26, 23)'}}>
        <Toolbar>
        <Broccoli className={classes.image}></Broccoli>
        <Button style={{textTransform: 'none'}} className={classes.title}>
            <Typography variant="h6">
              <Link to="/">
                Home
              </Link>
            </Typography>
          </Button>
          <Button style={{textTransform: 'none'}} className={classes.title}>
            <Typography variant="h6">
              <Link to="/discover">
                Discover
              </Link>
            </Typography>
          </Button>
          <Button style={{textTransform: 'none'}} className={classes.title}>
            <Typography variant="h6" >
              <Link to="/contribute">
                Contribute
              </Link>
            </Typography>
          </Button>
          <Button className={classes.button}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}